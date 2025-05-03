import { useState } from "react";
import { useNavigate } from "react-router-dom";
import $api from "../../functionComponent/axiosConfig";

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

function Form({ setAuth, setUserData }) {
  const [isRegistration, setRegistration] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const url = isRegistration ? "/registration" : "/login";
      const res = await $api.post(url, formData);

      localStorage.setItem("token", res.data.accessToken);
      setAuth(true);
      setUserData(res.data.user);
      navigate("/books");
    } catch (err) {
      setError(err.response?.data?.message || "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{isRegistration ? "Регистрация" : "Вход"}</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {isRegistration && (
            <div className="form-group">
              <label className="form-label">Имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваше имя"
                className="form-input"
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ваш email"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ваш пароль"
              className="form-input"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Загрузка..." : (isRegistration ? "Зарегистрироваться" : "Войти")}
            </button>
          </div>
        </form>
        
        <div className="auth-switch">
          {isRegistration ? (
            <p className="switch-text">
              Уже есть аккаунт?{" "}
              <button 
                type="button" 
                onClick={() => setRegistration(false)}
                className="switch-button"
              >
                Войти
              </button>
            </p>
          ) : (
            <p className="switch-text">
              Нет аккаунта?{" "}
              <button 
                type="button" 
                onClick={() => setRegistration(true)}
                className="switch-button"
              >
                Зарегистрироваться
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;