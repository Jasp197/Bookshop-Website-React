import "./ConfirmationPage.css";

import {useCart} from "../contexts/CartContext.tsx";
import {BookItem} from "../types.ts";
import {asDollarsAndCents} from "../utils.ts";
import {useOrderDetails} from "../contexts/OrderDetailsContext.tsx";
import {Link} from "react-router-dom";
import {useCategoryContext} from "../contexts/CategoryContext.tsx";


function getOriginalMonthAndYear(expirationDate: Date): { month: string, year: string } {
  const calendar = new Date(expirationDate);
  const month = (calendar.getMonth() + 1).toString().padStart(2, '0'); // getMonth is zero-based
  const year = calendar.getFullYear().toString();
  return { month, year };
}

function getLastFourDigits(cardNumber: string): string {
  return cardNumber.slice(-4);
}

export default function ConfirmationPage() {

  const { orderDetails} = useOrderDetails();

  const { lastSelectedCategoryName } = useCategoryContext();

  const { cart } = useCart();

  const getQuantity = (book: BookItem) => {
    const item = orderDetails.lineItems.find((item) => item.bookId === book.bookId);
    return item?.quantity;
  };


  const expirationDate = new Date(orderDetails.customer.ccExpDate);
  const { month, year } = getOriginalMonthAndYear(expirationDate);
  const lastFourDigits = getLastFourDigits(orderDetails.customer.ccNumber);

  if (!orderDetails || !orderDetails.order) {
    return (
        <div className="confirmation confirmation-summary">
          <h1>Confirmation</h1>
          <div className="empty-cart-message">
            <p>Your order is invalid.</p>
            <Link className="continue-shopping" to={`/category/${lastSelectedCategoryName}`}>
              <button>
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
    );
  }

  return (
      <div className="confirmation">
        <section className="confirmation-summary">
          <h1>Confirmation</h1>
          <p>
            Your confirmation number is {orderDetails.order.confirmationNumber}
          </p>
          <p>{new Date(orderDetails.order.dateCreated).toString()}</p>
      </section>
      <section className="confirmation-order-details">
        <table className="order-details-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.books.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{getQuantity(book)}</td>
                <td>
                  {asDollarsAndCents(book.price * (getQuantity(book) || 1))}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="right-align">Delivery Cost</td>
              <td>{asDollarsAndCents(cart.surcharge)}</td>
            </tr>
            <tr>
              <td colSpan={2} className="right-align">
                <strong>Total</strong>
              </td>
              <td>
                <strong>{asDollarsAndCents(orderDetails.order.amount)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="customer-details">
        <h1>Customer Information</h1>
        <ul>
          <div>Name: {orderDetails.customer.customerName}</div>
          <div>Address: {orderDetails.customer.address}</div>
          <div>Email: {orderDetails.customer.email}</div>
          <li>Card number: **** {lastFourDigits}</li>
          <li>Exp Date: {month}/{year}</li>
        </ul>
      </section>
      </div>
  );
}
