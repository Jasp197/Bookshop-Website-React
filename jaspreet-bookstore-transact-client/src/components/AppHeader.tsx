import HeaderDropdown from "./HeaderDropdown";
import { Link } from "react-router-dom";
import "./AppHeader.css";
import {siteImagePrefix} from "../utils.ts";
import {useCart} from "../contexts/CartContext.tsx";

export default function AppHeader() {

  const { cart } = useCart();
  return (
    <header className="container">
        <section className="bookstore-logo">
            <Link to="/">
                <img
                    src={`${siteImagePrefix}bookstore-logo.png`}
                    alt="The Book Nook Logo"
                    width="125px"
                    height="auto"
                />
            </Link>
            <h1 className="text-logo">
                <Link to="/">
                    THE BOOK<br /> NOOK
                </Link>
            </h1>
        </section>

        <section className="title-and-search-bar">
            <form className="search-box" action="/">
                <input type="text" className="search-bar" placeholder="Search for books"/>
                <Link to="/category/Fantasy">
                    <i className="icon-search"></i>
                </Link>
            </form>
            <HeaderDropdown />
        </section>


        <section className="header-dropdown-and-cart">
            <Link to={"/cart"}>
                <button className="cart-button">
                    <i className="icon-shopping-cart cart-icon"></i>
                    <span className="item-count">{cart.numberOfItems}</span>
                </button>
            </Link>
            <button className="sign-in-button">
                <i className="icon-user"></i>
                Sign in
            </button>

        </section>
    </header>

  );
}
