import { useNavigate } from "react-router-dom";
import logoutReq from "../../functionComponent/apiLogout";

function Header({ isAuth, onLogout }) {
  const navigate = useNavigate();

  const logout = async () => {
    onLogout();
    await logoutReq();
    navigate("/auth");
  };

  return (
    <header>
      <div className="header-container">
        <h1 className="app-logo" onClick={() => navigate("/")}>Почитайка</h1>
        <div className="nav-buttons">
          {isAuth ? (
            <>
              <button onClick={() => navigate("/books")}>Книги</button>
              <button onClick={() => navigate("/mybook")}>Мои книги</button>
              <button onClick={() => navigate('/favourites')}>Избранное</button>
              <button onClick={logout} className="logout-btn">Выйти</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/books')}>Книги</button>
              <button onClick={() => navigate("/auth")}>Войти</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;