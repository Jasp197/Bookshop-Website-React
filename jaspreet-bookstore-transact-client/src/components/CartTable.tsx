import "./CartTable.css";

import {bookImageFilename} from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {useCart} from "../contexts/CartContext.tsx";
import {BookItem, ShoppingCartItem} from "../types.ts";
import {Link} from "react-router-dom";
import {useCategoryContext} from "../contexts/CategoryContext.tsx";


function CartTable() {

  const {cart, dispatch} = useCart();
  const cartItems = cart.items;

  const cartBookImage = (book: BookItem) => (
      <div className="cart-book-image">
          <img
              src={`${bookImageFilename(book)}`}
              alt={book.title}
          />
      </div>
  );

    const increment = (item: ShoppingCartItem) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      book: item.book,
      quantity: item.quantity + 1
    });
  };

  const decrement = (item: ShoppingCartItem) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      book: item.book,
      quantity: item.quantity - 1
    });
  };

  const cartBookQuantity = (item: ShoppingCartItem) => (
      <div className="cart-book-quantity">
          <button className="icon-button dec-button" onClick={() => decrement(item)}>
              <FontAwesomeIcon icon={faMinusCircle}/>
          </button>
          <span className="quantity">{item.quantity}</span>&nbsp;
          <button className="icon-button inc-button" onClick={() => increment(item)}>
              <FontAwesomeIcon icon={faPlusCircle}/>
          </button>
      </div>
  )

    const cartTableRows = cartItems.map((item) => (
        <div className="grid-table-row" key={item.book.title}>
            <li className="grid-book-row">
                {cartBookImage(item.book)}
                <div className="cart-book-title">
                    <p>{item.book.title}</p>
                    <p className="cart-book-author"> - by <b>{item.book.author}</b></p>
                </div>
                <div className="cart-book-price">${(item.book.price / 100).toFixed(2)}</div>
                {cartBookQuantity(item)}
                <div className="cart-book-subtotal">
                    ${((item.book.price / 100) * item.quantity).toFixed(2)}
                </div>
            </li>
            <div className="line-sep"></div>
        </div>
    ));

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.book.price / 100) * item.quantity, 0).toFixed(2);

  const numberOfItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART'});
  };

  const { lastSelectedCategoryName } = useCategoryContext(); // Use the custom hook to get categories

  return (
      <div className="cart-container">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <p>Your cart is empty.</p>
                <Link className="continue-shopping" to={`/category/${lastSelectedCategoryName}`}>
                    <button>
                        Continue Shopping
                    </button>
                </Link>
            </div>
          ) : (
          <div className="cart-table">
              <ul>
                  <li className="table-heading" key="heading">
                      <div className="heading-book">Book</div>
                      <div className="heading-price">Price / Quantity</div>
                      <div className="heading-subtotal">Amount</div>
                  </li>

                  {cartTableRows}

                  <div className="total-row" key="total">
                      <div className="item-count">
                          {`Cart contains ${numberOfItems} book${numberOfItems !== 1 ? 's' : ''}.`}
                      </div>
                      <div className="total-label">Total amount:</div>
                      <div className="total-value">${totalAmount}</div>
                  </div>

                  <button className="clear-cart" onClick={handleClearCart}>
                      Clear Cart
                  </button>
                  <div className="button-row" key="buttons">

                      <Link className="continue-shopping" to={`/category/${lastSelectedCategoryName}`}>
                          <button>
                              Continue Shopping
                          </button>
                      </Link>

                      <Link className="proceed-checkout" to={"/checkout"}>
                          <button>
                              Proceed to Checkout
                          </button>
                      </Link>
                  </div>
              </ul>
          </div>
          )}
      </div>
  );
}

export default CartTable;
