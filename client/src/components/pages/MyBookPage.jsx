import React, { useState, useEffect } from "react";
import $api from "../../functionComponent/axiosConfig";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function MyBookPage({ user }) {
  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState({});
  const [comment, setComment] = useState({
    id: null,
    text: "",
  });
  const [bookForm, setBookForm] = useState({
    title: "",
    description: "",
    opinion: "",
    link: "",
  });
  const [openComments, setOpenComments] = useState({});

  async function getMyBooks() {
    const res = await $api(`/mybook/${user.id}`);
    const booksData = Array.isArray(res.data) ? res.data : [res.data];

    const initialLikes = {};
    booksData.forEach((book) => {
      initialLikes[book.id] =
        book.book_like?.some((like) => like.user_id === user?.id) || false;
    });
    setLikedBooks(initialLikes);
    setBooks(booksData);
  }

  async function saveBook() {
    if (!bookForm.title.trim()) {
      alert("Название книги обязательно");
      return;
    }

    if (bookForm.id) {
      await $api.put(`/mybook/${bookForm.id}`, {
        title: bookForm.title,
        description: bookForm.description,
        opinion: bookForm.opinion,
        link: bookForm.link,
      });
    } else {
      await $api.post("/mybook", {
        title: bookForm.title,
        description: bookForm.description,
        opinion: bookForm.opinion,
        link: bookForm.link,
        user_id: user.id,
      });
    }
    setBookForm({
      title: "",
      description: "",
      opinion: "",
      link: "",
    });
    await getMyBooks();
  }

  function editingBook(book) {
    setBookForm({
      id: book.id,
      title: book.title,
      description: book.description,
      opinion: book.opinion,
      link: book.link,
    });
  }

  function cancelEditing() {
    setBookForm({
      id: null,
      title: "",
      description: "",
      opinion: "",
      link: "",
    });
  }

  async function deleteBook(id) {
    await $api.delete(`/mybook/${id}`);
    await getMyBooks();
  }

  async function like(id) {
    if (likedBooks[id]) {
      await $api.delete("/like", { data: { user_id: user?.id, book_id: id } });
    } else {
      await $api.post("/like", { user_id: user?.id, book_id: id });
    }
    setLikedBooks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    await getMyBooks();
  }

  async function handleComment(action, commentUser = null, bookId) {
    if (action === "add") {
      if (!comment.text.trim()) return;
      await $api.post("/comment", {
        opinion: comment.text,
        user_id: user?.id,
        book_id: bookId,
      });
      setComment({ id: null, text: "" });
    } else if (action === "save" && comment.id) {
      await $api.put(`/comment/${comment.id}`, {
        opinion: comment.text,
      });
      setComment({ id: null, text: "" });
    } else if (action === "delete" && commentUser?.id) {
      await $api.delete(`/comment/${commentUser.id}`);
    }
    await getMyBooks();
  }

  function editingComment(commentToEdit) {
    setComment({
      id: commentToEdit.id,
      text: commentToEdit.opinion,
    });
  }

  useEffect(() => {
    getMyBooks();
  }, [user]);

  return (
    <div className="my-books-container">
      <div className="book-form">
        <h2>{bookForm.id ? "Редактировать книгу" : "Добавить книгу"}</h2>
        <input
          value={bookForm.title}
          onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
          placeholder="Название книги"
        />
        <textarea
          value={bookForm.description}
          onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
          placeholder="Описание книги"
        />
        <textarea
          value={bookForm.opinion}
          onChange={(e) => setBookForm({ ...bookForm, opinion: e.target.value })}
          placeholder="Ваше мнение о произведении"
        />
        <input
          value={bookForm.link}
          onChange={(e) => setBookForm({ ...bookForm, link: e.target.value })}
          placeholder="Ссылка где можно прочитать"
        />
        <div className="book-form-buttons">
          <button onClick={saveBook}>
            {bookForm.id ? "Сохранить изменения" : "Добавить книгу"}
          </button>
          {bookForm.id && <button onClick={cancelEditing}>Отменить</button>}
        </div>
      </div>
  
      <div className="books-vertical-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <button onClick={() => like(book.id)} className="like-button">
              {likedBooks[book.id] ? (
                <FaHeart color="IndianRed" size={24} />
              ) : (
                <FaRegHeart color="DarkGreen" size={24} />
              )}
              <span>{book?.book_like?.length || 0}</span>
            </button>
  
            <div className="book-content">
              <p><strong>Описание:</strong> {book.description}</p>
              <p><strong>Мнение:</strong> {book.opinion}</p>
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                Прочитать книгу
              </a>
            </div>
  
            <div className="comments-section">
              <button onClick={() => setOpenComments(prev => ({...prev, [book.id]: !prev[book.id]}))}>
                Комментарии
              </button>
              
              {openComments[book.id] && (
                <div className="comments-container">
                  <div className="comment-input">
                    <input
                      value={comment.text}
                      onChange={(e) => setComment({ ...comment, text: e.target.value })}
                      placeholder="Ваш комментарий"
                    />
                    <button onClick={() => handleComment("add", null, book.id)}>
                      Добавить
                    </button>
                  </div>
  
                  {book.book_comment?.map((el) => (
                    <div key={el.id} className="comment-item">
                      {comment.id === el.id ? (
                        <div className="editing-comment">
                          <input
                            value={comment.text}
                            onChange={(e) => setComment({ ...comment, text: e.target.value })}
                          />
                          <div className="comment-buttons">
                            <button onClick={() => handleComment("save")}>Сохранить</button>
                            <button onClick={() => setComment({ id: null, text: "" })}>
                              Отмена
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="comment-author">
                            <p>{el.comment_on_user.name}</p>
                          </div>
                          <div className="comment-text">
                            <p>{el.opinion}</p>
                          </div>
                          {el.user_id === user?.id && (
                            <div className="comment-buttons">
                              <button onClick={() => editingComment(el)}>Изменить</button>
                              <button onClick={() => handleComment("delete", el)}>
                                Удалить
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
  
            <div className="book-actions">
              <button onClick={() => editingBook(book)}>Изменить книгу</button>
              <button onClick={() => deleteBook(book.id)}>Удалить книгу</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookPage;
