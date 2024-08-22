package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;

    private OrderDao orderDao;
    private CustomerDao customerDao;
    private LineItemDao lineItemDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

    public void setOrderDao(OrderDao orderDao) {this.orderDao = orderDao;}
    public void setCustomerDao(CustomerDao customerDao) {this.customerDao = customerDao;}
    public void setLineItemDao(LineItemDao lineItemDao) {this.lineItemDao = lineItemDao;}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		// NOTE: THIS METHOD PROVIDED NEXT PROJECT

        Order order = orderDao.findByOrderId(orderId);
        Customer customer = customerDao.findByCustomerId(order.customerId());
        List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
        List<Book> books = lineItems
            .stream()
            .map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
            .toList();
        return new OrderDetails(order, customer, lineItems, books);

	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);


        try (Connection connection = JdbcUtils.getConnection()) {
            Date ccExpDate = getCardExpirationDate(
                    customerForm.getCcExpiryMonth(),
                    customerForm.getCcExpiryYear());
            return performPlaceOrderTransaction(
                    customerForm.getName(),
                    customerForm.getAddress(),
                    customerForm.getPhone(),
                    customerForm.getEmail(),
                    customerForm.getCcNumber(),
                    ccExpDate, cart, connection);
        } catch (SQLException e) {
            throw new BookstoreDbException("Error during close connection for customer order", e);
        }

	}

    private Date getCardExpirationDate(String ccExpiryMonth, String ccExpiryYear) {

        int month = Integer.parseInt(ccExpiryMonth) - 1; // Calendar month is zero-based
        int year = Integer.parseInt(ccExpiryYear);

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH)); // Last day of the month

        // Set time to the end of the day
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);

        return calendar.getTime();

    }


    private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();
        if (name == null || name.equals("") || name.length() < 4 || name.length() > 45) {
            throw new ApiException.ValidationFailure("name", "Invalid name field");
        }

		String address = customerForm.getAddress();
        if (address == null || address.equals("") || address.length() < 4 || address.length() > 45) {
            throw new ApiException.ValidationFailure("address", "Invalid address field");
        }

        String phone = customerForm.getPhone();
        if (phone == null || phone.isEmpty()) {
            throw new ApiException.ValidationFailure("phone", "Invalid phone number");
        }
        phone = phone.replaceAll("[\\s\\-()]", "");
        if (phone.length() != 10 || !phone.matches("\\d{10}")) {
            throw new ApiException.ValidationFailure("phone", "Invalid phone number");
        }

        String email = customerForm.getEmail();
        if (email == null || email.contains(" ") || !email.contains("@") || email.endsWith(".")) {
            throw new ApiException.ValidationFailure("email", "Invalid email address");
        }

        String ccNumber = customerForm.getCcNumber();
        if (ccNumber == null || ccNumber.isEmpty()) {
            throw new ApiException.ValidationFailure("ccNumber", "Invalid credit card number");
        }
        ccNumber = ccNumber.replaceAll("[\\s\\-]", "");
        if (ccNumber.length() < 14 || ccNumber.length() > 16 || !ccNumber.matches("\\d{14,16}")) {
            throw new ApiException.ValidationFailure("ccNumber", "Invalid credit card number");
        }

        if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
            throw new ApiException.ValidationFailure("Please enter a valid expiration date");
        }

	}

    private long performPlaceOrderTransaction(
        String name, String address, String phone,
        String email, String ccNumber, Date date,
        ShoppingCart cart, Connection connection) {
        try {
            connection.setAutoCommit(false);
            long customerId = customerDao.create(
                    connection, name, address, phone, email,
                    ccNumber, date);
            long customerOrderId = orderDao.create(
                    connection,
                    cart.getComputedSubtotal() + cart.getSurcharge(),
                    generateConfirmationNumber(), customerId);
            for (ShoppingCartItem item : cart.getItems()) {
                lineItemDao.create(connection, item.getBookId(),
                                   customerOrderId, item.getQuantity());
            }
            connection.commit();
            return customerOrderId;
        } catch (Exception e) {
            try {
                connection.rollback();
            } catch (SQLException e1) {
                throw new BookstoreDbException("Failed to roll back transaction", e1);
            }
            return 0;
        }
    }

    private int generateConfirmationNumber() {
        return ThreadLocalRandom.current().nextInt(999999999);
    }

    private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		try {
            int month = Integer.parseInt(ccExpiryMonth);
            int year = Integer.parseInt(ccExpiryYear);

            // Check if month is valid
            if (month < 1 || month > 12) {
                return true;
            }

            // Check if year is a reasonable value (e.g., not too far in the past or future)
            int currentYear = YearMonth.now().getYear();
            if (year < currentYear || year > currentYear + 50) {
                return true;
            }

            YearMonth expiryDate = YearMonth.of(year, month);
            return expiryDate.isBefore(YearMonth.now());
        } catch (NumberFormatException e) {
            return true;
        }

	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 0 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			// TODO: complete the required validations
		});

		cart.getItems().forEach(item -> {
            if (item.getQuantity() <= 0 || item.getQuantity() > 99) {
                throw new ApiException.ValidationFailure("Invalid quantity");
            }
            Book databaseBook = bookDao.findByBookId(item.getBookId());
            if (databaseBook == null) {
                throw new ApiException.ValidationFailure("Book not found in database");
            }
            if (item.getBookForm().getPrice() != databaseBook.price()) {
                throw new ApiException.ValidationFailure("Price mismatch for item: " + item.getBookId());
            }
            if (item.getBookForm().getCategoryId() != databaseBook.categoryId()) {
                throw new ApiException.ValidationFailure("Category mismatch for item: " + item.getBookId());
            }
        });
	}

}
