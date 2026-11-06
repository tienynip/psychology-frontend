import { useState } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!fullName || !email.trim() || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (password != confirmPassword) {
      setError("Mật khẩu không trùng khớp");
      return;
    }
    setLoading(true);
    try {
      const response = await registerUser({
        username: fullName,
        email: email.trim(),
        password: password,
      });
      setSuccess("Đăng ký tài khoản thành công!");
      console.log("Đăng ký thành công:", response.data);
      setTimeout(() => {
        navigate("/home");
      }, 300);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email này đã được đăng ký!");
      } else if (err.response?.status === 422) {
        setError("Thông tin không hợp lệ. Hãy kiểm tra lại email và mật khẩu.");
      } else {
        setError(
          err.response?.data?.detail || "Không thể đăng ký. Vui lòng thử lại.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
      <div className={styles.registerCard}>
        <h2>Đăng ký tài khoản</h2>

        <form onSubmit={handleRegister}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Họ và tên</label>
            <input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              placeholder="Nhập họ và tên"
              autoComplete="name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Nhập email"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="register-password">Mật khẩu</label>
            <input
              id="register-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Tối thiểu 8 ký tự"
              autoComplete="new-password"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              autoComplete="new-password"
              required
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}

          <button type="submit" className={styles.submitBtn}>
            Đăng ký
          </button>
        </form>

        <div className={styles.backToLogin}>
          Đã có tài khoản?
          <Link to="/">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
