import { useState } from "react";
import styles from "./Login.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      const token = response.data.access_token;
      localStorage.setItem("access_token", token);
      const userResponse = await getCurrentUser();
      console.log("Đăng nhập thành công:", userResponse.data);
      navigate("/home");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.response?.data || err.message);
      localStorage.removeItem("access_token");
      setError(err.response?.data?.detail || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
      <div className={styles.loginCard}>
        <h2>Đăng nhập tài khoản</h2>

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Nhập email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
        <div className={styles.backToRegister}>
          Chưa tài khoản?
          <Link to="/register">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
