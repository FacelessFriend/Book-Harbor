import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $api from "../../functionComponent/apiAuth";

function BooksPage({ user, isAuth }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function getBooks() {
    const res = await $api("/book");
    setBooks(res);
    console.log(res);
  }

  async function getBookOnTitle() {
    if (!searchTerm.trim()) {
      getBooks(); // Если поисковая строка пустая, показываем все книги
      return;
    }
    const res = await $api(
      `/book/search?title=${encodeURIComponent(searchTerm)}`
    );
    setBooks(res);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getBookOnTitle();
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Поиск по названию"
            className="form-input search-input"
          />
          <button type="submit">Искать</button>
        </form>
      </div>
      <ul className="books-grid">
        {books.map((el) => (
          <li key={el.id} className="book-card">
            <h1>{el.title}</h1>
            <p>{el.description}</p>
            {isAuth && (
              <button
                className="book-button"
                onClick={() => navigate(`/book/${el.id}`)}
              >
                Перейти к книге
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default BooksPage;
