import { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { loginSuccess } from "../../context/AuthActions";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  

  const handleClick = async (e) => {
    e.preventDefault();
    const callApi = await loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );

    console.log(isFetching);

    if (callApi && callApi.data) {
      localStorage.setItem("userData", JSON.stringify(callApi.data));
      dispatch(loginSuccess(callApi.data));
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
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              required
              ref={password}
              minLength="6"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? "loading" : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Create a New Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
