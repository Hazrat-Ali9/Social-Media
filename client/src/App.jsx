import Home from "./Pages/Home/Home.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import { loginSuccess } from "./context/AuthActions.jsx";

function App() {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const saveUserDataToLocal = () => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        // console.log(parsedUserData);
        dispatch(loginSuccess(parsedUserData));

      } else {
        dispatch(loginSuccess(null));
      }
    };
    saveUserDataToLocal();
  }, []);
  // console.log(user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={localStorage.getItem("userData") ? <Home /> : <Register />}
          />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            path="/login/*"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register/*"
            element={user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
