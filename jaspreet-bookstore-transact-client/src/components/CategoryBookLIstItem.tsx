import { BookItem } from "../types";
import {getSlug, bookImagePrefix, siteImagePrefix} from "../utils";
import "./CategoryBookListItem.css";
import {useCart} from "../contexts/CartContext.tsx";
export default function CategoryBookListItem(props: { book: BookItem }) {
  const bookImageFileName = `${getSlug(props.book.title)}.png`;

  const { dispatch } = useCart();
  const handleAddToCart = () => {
    dispatch({ type: 'ADD_BOOK', book: props.book });
  };

  return (

    <li className="book-box">

        {props.book.isPublic && (
            <img src={`${siteImagePrefix}read-me.png`} alt="Read Me" className="badge" />
        )}
        <img src={`${bookImagePrefix}${bookImageFileName}`} alt={props.book.title}/>
            <section className="book-info-plus-cart">

                <div className="add-cart-button-container">
                    <button className="add-cart-button" onClick={handleAddToCart}>
                        <i className="icon-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
                <section className="book-info">
                    <h3 className="book-title">{props.book.title}</h3>
                    <p className="book-author">by <b>{props.book.author}</b></p>
                    <p className="book-price">${(props.book.price / 100).toFixed(2)}</p>
                </section>
            </section>
    </li>

  );
}
