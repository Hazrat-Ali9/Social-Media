import "./home.css";
import Topbar from "../../Components/TopBar/Topbar.jsx";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import Feed from "../../Components/Feed/Feed.jsx";
import Rightbar from "../../Components/Rightbar/Rightbar.jsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { loginSuccess } from "../../context/AuthActions.jsx";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
