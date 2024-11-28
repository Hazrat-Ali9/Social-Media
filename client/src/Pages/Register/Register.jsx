import { useRef } from "react";
import axios from "axios";
import "./Register.css";
import { Link, useNavigate , } from "react-router-dom";
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});
export { api };

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const res = await api.post("/auth/register", user);
        console.log("user rejistered successfully");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social Media.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="User Name"
              required
              type="text"
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="loginInput"
            />
            <input
              placeholder="password"
              required
              type="password"
              ref={password}
              minLength="6"
              className="loginInput"
            />
            <input
              placeholder="password Again"
              required
              type="password"
              ref={passwordAgain}
              minLength="6"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Log in Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
