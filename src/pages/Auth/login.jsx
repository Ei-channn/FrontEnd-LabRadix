import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
// import "./Login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    console.log("FULL RESPONSE:", response.data);

    localStorage.setItem("token", response.data.access_token);

    navigate("/dashboard");

  } catch (error) {
    alert("Login gagal!");
    }
  };

  return (
    <div className="container-login">
      <div class="bg-decoration"></div>
      <div class="bg-decoration"></div>
      <div class="bg-decoration"></div>

      <div class="login-container">
        <div class="login-header">
          <h1>Apotek Santi Medika</h1>
          <p>Silakan masuk ke akun Anda</p>
        </div>
        <form onSubmit={handleLogin} class="login-form" id="loginForm">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="remember" name="remember" />
              <label for="remember">Ingat saya</label>
            </div>
          </div>
          <button type="submit" class="btn-login" id="loginBtn">Login</button>
        </form>

        <div class="divider">
            <span>atau</span>
        </div>

        <div class="register-link">
            Belum punya akun? <a href="#">Register disini!!</a>
        </div>
      </div>
    </div>
  );
}

export default Login;