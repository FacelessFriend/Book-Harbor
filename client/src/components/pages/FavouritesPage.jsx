import React, { useState, useEffect } from "react";
import $api from "../../functionComponent/axiosConfig";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function FavouritesPage({ user }) {
  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState({});
  const [comment, setComment] = useState({
    id: null,
    text: "",
  });
  const [openComments, setOpenComments] = useState({});

  async function getBooks() {
    if (!user?.id) return;

    const res = await $api(`/like/${user.id}`);
    const booksData = Array.isArray(res.data) ? res.data : [res.data];

    const initialLikes = {};
    booksData.forEach((likeItem) => {
      const book = likeItem.like_on_book;
      initialLikes[book.id] =
        book.book_like?.some((like) => like.user_id === user?.id) || false;
    });
    setLikedBooks(initialLikes);
    setBooks(booksData.map((item) => item.like_on_book));
  }

  async function like(id) {
    if (!user?.id) return;

    if (likedBooks[id]) {
      await $api.delete("/like", { data: { user_id: user.id, book_id: id } });
    } else {
      await $api.post("/like", { user_id: user.id, book_id: id });
    }
    setLikedBooks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    await getBooks();
  }

  async function handleComment(action, commentUser = null, bookId) {
    if (!user?.id) return;

    if (action === "add") {
      if (!comment.text.trim()) return;
      await $api.post("/comment", {
        opinion: comment.text,
        user_id: user.id,
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
    await getBooks();
  }

  function editingComment(commentToEdit) {
    setComment({
      id: commentToEdit.id,
      text: commentToEdit.opinion,
    });
  }

  useEffect(() => {
    getBooks();
  }, [user?.id]);

  if (!user) {
    return <div>Please log in to view favorites</div>;
  }

  return (
    <div className="favourites-container">
      <div className="books-vertical-list">
        {books.map((book) => (
          <div key={book.id} className="favourite-card">
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
              <button
                onClick={() =>
                  setOpenComments((prev) => ({
                    ...prev,
                    [book.id]: !prev[book.id],
                  }))
                }
              >
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
                            <p>{el.comment_on_user?.name || book.books_on_user?.name}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavouritesPage;
