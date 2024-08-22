import CategoryNavLinks from "./CategoryNavLinks.tsx";
import "./HeaderDropdown.css";
export default function HeaderDropdown() {
  return (
    <div className="header-dropdown">
        <button className="categories-button">
            Categories
            <i className="icon-caret-down"></i>
        </button>
        <CategoryNavLinks />
    </div>
  );
}
