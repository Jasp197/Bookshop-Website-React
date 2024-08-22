import CategoryNav from "../components/CategoryNav";
// import child components
import CategoryBookList from "../components/CategoryBookList";
import {useParams} from "react-router-dom";
import {useCategoryContext} from "../contexts/CategoryContext.tsx";
import {useEffect} from "react";
// import CSS style file (note: no styles for this page)
// export component function
export default function CategoryPage() {

  const { categoryName } = useParams();
  const { setLastSelectedCategoryName } = useCategoryContext();

  useEffect(() => {
    if (categoryName) {
      setLastSelectedCategoryName(categoryName);
    }
  }, [categoryName, setLastSelectedCategoryName]);

  return (
    <div className="category-page">
      <CategoryNav />
      <CategoryBookList />
    </div>
  );
}
