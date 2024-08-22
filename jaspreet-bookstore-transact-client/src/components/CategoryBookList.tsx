import {useState, useEffect} from "react";

import { useParams } from "react-router-dom";
import "./CategoryBookList.css";
import CategoryBookListItem from "./CategoryBookLIstItem";
import {fetchBooksByCategoryName} from "../services.ts";
import {BookItem} from "../types.ts";
export default function CategoryBookList() {

  const { categoryName } = useParams();

  const [bookList, setBookList] = useState<BookItem[]>([]);

  useEffect(() => {
    fetchBooksByCategoryName(categoryName as string).then((data:BookItem[]) =>
      setBookList(data)
    );
  }, [categoryName]);

  console.log(bookList);

  console.log("category name inside book list component");
  console.log(categoryName);
  console.log("book list inside book list component");
  console.log(bookList);

  const bookBoxList = bookList.map((myBook) => (

      <CategoryBookListItem key={myBook.bookId} book={myBook} />

  ));
  return (

  <main className="main-content">
    <h2>{categoryName}</h2>
    <ul>
      {bookBoxList}
    </ul>
  </main>

  );
}
