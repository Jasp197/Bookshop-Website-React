import { NavLink } from "react-router-dom";
import "./HeaderDropdown.css";
import { useCategoryContext } from '../contexts/CategoryContext';

export default function CategoryNavLinks() {

  const { categories, setLastSelectedCategoryName } = useCategoryContext(); // Use the custom hook to get categories
  const handleCategoryClick = (categoryName: string) => {
      setLastSelectedCategoryName(categoryName);
  }

  const categoryNavLinks = categories.map((category) => (
    <li key={category.categoryId}>

        <NavLink to={`/category/${category.name}`} onClick={() => handleCategoryClick(category.name)}>
            {category.name}
        </NavLink>

    </li>
  ));

  return <ul>{categoryNavLinks}</ul>;
}
