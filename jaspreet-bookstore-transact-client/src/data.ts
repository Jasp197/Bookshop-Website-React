// import { BookItem, CategoryItem } from "./types";
// import sourceData from "./db.json";
// export function getCategories(): CategoryItem[] {
//   return sourceData.categories as CategoryItem[];
// }
//
// export function getBooksForCategory(categoryName: string): BookItem[] {
//   console.log("category name inside data.ts");
//   console.log(categoryName);
//   const selectedCategory: CategoryItem = sourceData.categories.find(
//     (category: CategoryItem) => category.name === categoryName
//   ) as CategoryItem;
//   console.log("selected category inside data.ts in get books for category");
//   console.log(selectedCategory);
//   console.log(selectedCategory.categoryId);
//   const fullBookList: BookItem[] = sourceData.books;
//   console.log(fullBookList);
//
//   const filteredBookList = fullBookList.filter(
//     (book) => book.categoryId === selectedCategory.categoryId
//   );
//   console.log(
//     "booklist inside data.ts in get books for category, before returning"
//   );
//   console.log(filteredBookList);
//   return filteredBookList;
// }
