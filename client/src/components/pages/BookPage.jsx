import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import $api from "../../functionComponent/axiosConfig";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function BookPage({ user }) {
  const [book, setBook] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState({
    id: null,
    text: "",
  });
  const [openComment, setOpenComment] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  async function getBook(bookId) {
    const res = await $api(`/book/${bookId}`);
    setBook(res.data);
    setIsLiked(
      res.data.book_like?.some((like) => like.user_id === user?.id) || false
    );
    console.log(res.data);
  }

  async function like() {
    if (isLiked) {
      await $api.delete("/like", { data: { user_id: user?.id, book_id: id } });
    } else {
      await $api.post("/like", { user_id: user?.id, book_id: id });
    }
    await getBook(id);
  }

  async function handleComment(action, commentUser = null) {
    if (action === "add") {
      if (!comment.text.trim()) return;
      await $api.post("/comment", {
        opinion: comment.text,
        user_id: user?.id,
        book_id: id,
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

    await getBook(id);
  }

  function startEditing(commentToEdit) {
    setComment({
      id: commentToEdit.id,
      text: commentToEdit.opinion,
    });
  }

  useEffect(() => {
    if (id && user) getBook(id);
  }, [id, user]);

  return (
    <div className="book-page">
        <button onClick={() => navigate("/books")}>◀ Назад к списку книг</button>
        {book && (
            <>
                <h2>{book.title}</h2>
                <button onClick={like} className="like-button">
                    {isLiked ? (
                        <FaHeart color="IndianRed" size={24} />
                    ) : (
                        <FaRegHeart color="DarkGreen" size={24} />
                    )}
                    <span>{book?.book_like?.length || 0}</span>
                </button>

                <div className="book-content">
                    <p>Описание: {book.description}</p>
                    <p>Мнение: {book.opinion}</p>
                    <a href={book.link}>Прочитать книгу</a>
                </div>

                <div className="comments-section">
                    <button onClick={() => setOpenComment(!openComment)}>
                        Комментарии
                    </button>
                    {openComment && (
                        <div className="comment-input">
                            <input
                                value={comment.text}
                                onChange={(e) => setComment({ ...comment, text: e.target.value })}
                                placeholder="Ваш комментарий"
                            />
                            <div className="comment-actions">
                                <button onClick={() => handleComment("add")}>Добавить</button>
                            </div>

                            {book.book_comment?.map((el) => (
                                <div key={el.id} className="comment-item">
                                    {comment.id === el.id ? (
                                        <div className="editing-comment">
                                            <input
                                                value={comment.text}
                                                onChange={(e) => setComment({ ...comment, text: e.target.value })}
                                            />
                                            <div className="editing-actions">
                                                <button onClick={() => handleComment("save")}>Сохранить</button>
                                                <button onClick={() => setComment({ id: null, text: "" })}>Отмена</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="comment-author">
                                                <p>{el.comment_on_user.name}</p>
                                            </div>
                                            <div className="comment-text">
                                                <p>{el.opinion}</p>
                                                {el.user_id === user?.id && (
                                                    <div className="comment-buttons">
                                                        <button onClick={() => startEditing(el)}>Изменить</button>
                                                        <button onClick={() => handleComment("delete", el)}>Удалить</button>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </>
        )}
    </div>
);
}

export default BookPage;
