import { Link } from "react-router-dom";

import "./WelcomePage.css";
import {categoryImagePrefix} from "../utils.ts";
export default function WelcomePage() {
  return (
      <div className="home-page">
          <section className="shop">
              <Link className="shop-button" to="/category/Fantasy">
                  SHOP FOR BOOKS!!
              </Link>
          </section>

          <section className="category-images">
              <section className="best-selling-text">
                  <h2>
                      BEST SELLING BOOKS:
                  </h2>
              </section>
              <section className="category-image-items">
                  <a>
                      <img
                          src={`${categoryImagePrefix}best-selling-1.png`}
                          alt="Best selling-1"
                      />
                  </a>
                  <a>
                      <img
                          src={`${categoryImagePrefix}best-selling-2.png`}
                          alt="Best selling-2"
                      />
                  </a>
                  <a>
                      <img
                          src={`${categoryImagePrefix}best-selling-3.png`}
                          alt="Best selling-3"
                      />
                  </a>
                  <a>
                      <img
                          src={`${categoryImagePrefix}best-selling-4.png`}
                          alt="Best selling-4"
                      />
                  </a>
              </section>
          </section>
      </div>

  );
}
