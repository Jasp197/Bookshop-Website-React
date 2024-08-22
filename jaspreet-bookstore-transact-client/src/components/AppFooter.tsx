import "./AppFooter.css";
import {siteImagePrefix} from "../utils.ts";
export default function AppFooter() {
  return (
      <footer className="container">

          <section className="copyright">
              @ The Book Nook 2024
          </section>
          <section className="links">
              <a className="footer-link" href="#">About us </a> |
              <a className="footer-link" href="#">Contact us </a> |
              <a className="footer-link" href="#">Directions </a> |
          </section>

          <section className="social-media-icons">
              <a className="social-media-button" href="#">
                  <img src={`${siteImagePrefix}Facebook_logo.png`} alt={"facebook-logo"}/>
              </a>
              <a className="social-media-button" href="#">
                  <img src={`${siteImagePrefix}Instagram_logo.png`} alt={"insta-logo"}/>
              </a>
              <a className="social-media-button" href="#">
                  <img src={`${siteImagePrefix}Twitter_logo.png`} alt={"twitter-logo"}/>
              </a>
          </section>
      </footer>
  );
}
