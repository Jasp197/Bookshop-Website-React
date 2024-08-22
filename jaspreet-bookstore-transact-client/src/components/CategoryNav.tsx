import CategoryNavLinks from "./CategoryNavLinks.tsx";
import "./HeaderDropdown.css";
import "./CategoryNav.css";
export default function CategoryNav() {
  return (
      <div className="sidebar">
          <h2>Categories</h2>

          <ul>
              <CategoryNavLinks />
          </ul>
      </div>
  );
}
