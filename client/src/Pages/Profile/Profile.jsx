import "./profile.css";
import Topbar from "../../Components/TopBar/Topbar.jsx";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import Feed from "../../Components/Feed/Feed.jsx";
import Rightbar from "../../Components/Rightbar/Rightbar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useUploadImage from "../../CustomHook/useUploadImage.jsx";
const api = axios.create({
  baseURL: "http://localhost:4000/api",
});
export { api };

// http:localhost:4000/profile/username

export default  function Profile() {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [profilePicDisplay, setProfilePicDisplay] = useState(false);
  const [file , setFile] = useState()
  const [loading ,setLoading] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users?username=${username}`);
        res.data.data && console.table(res.data + " ====>>> user");
        setUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [username]);

    // // upload image
    // const uploadImg = async (profileImage) => {
    //   try {
    //     console.log("profileImage", profileImage);
    //     setLoading(!loading);
    //     const imgUrl = await useUploadImage(profileImage, profileImage.name);
    //     setFile(imgUrl);
    //     console.log("file", file);
    //     setFile((prevUrl) => {
    //       console.log("Updated file state:", prevUrl); // This will log the updated state
    //       setLoading(false);
    //       return imgUrl;
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // useEffect(() => {
    //   console.log(file + " ==>> file")
    //   const saveImg = async () => {
    //     const save = await api.put(`/users/${user._id}`, { profilePicture: file });
    //     console.log(save)
    //   }
    //   saveImg()
    // } , [file])


  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || `${PF}person/noCover.png`}
                alt=""
              />
              <img
                onClick={() => {
                  setProfilePicDisplay(!profilePicDisplay);
                  console.log(profilePicDisplay);
                }}
                className="profileUserImg"
                style={{
                  border: user?.profilePicture ? "3px soild white" : "none",
                }}
                src={user.profilePicture || `${PF}person/noAvater.png`}
                alt=""
              />

              {/* --------------------------------------------------------------- */}
              {/* uplaod image sab ready hai bas api hit kar ke fireBase ka url Db me save kar na hai */}
              {/* <div className="addImgContainer">
                <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => uploadImg(e.target.files[0]) && console.log(" file fireBase me gai!")}
              />
                <button className="addImg">
                  <label htmlFor="file">
                  <AddPhotoAlternateIcon className="addImgIcon file"  />
                  </label>
                </button>
              </div> */}


            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">
                {user?.desc ? user.desc : "hello friends"}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>

      <div
        className="profilePicDisplayContainer"
        style={{ display: profilePicDisplay ? "flex" : "none" }}
      >
        <img
          className="profilePicDisplay"
          src={user?.profilePicture || `${PF}person/noAvater.png`}
          alt=""
        />

        <ClearIcon
          onClick={() => setProfilePicDisplay(!profilePicDisplay)}
          className="profilePicDisplayClose"
        />
      </div>
    </>
  );
}

// localhost:5000/profile/:username
// localhost:5000/profile/:userId
