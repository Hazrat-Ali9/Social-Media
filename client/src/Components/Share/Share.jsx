import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import useUploadImage from "../../CustomHook/useUploadImage";
import ClearIcon from '@mui/icons-material/Clear';

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});
export { api };

export default function Share() {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    try {
      const newPost = {
        userId: user.data._id,
        desc: desc.current.value,
      };

      if (file) {
        // console.log("file", file);
        newPost.image = file;
        // console.log("newPost", newPost);
      }

      const res = await api.post("/posts", newPost); 
      if (res.message === "your post has been created!") {
      // alert("Post uploaded successfully");
      window.location.reload();
      } else {
        console.error(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // upload image
  const uploadImg = async (userFileImg) => {
    try {
      console.log("userFileImg", userFileImg);
      setLoading(!loading);
      const imgUrl = await useUploadImage(userFileImg, userFileImg.name);
      setFile(imgUrl);
      console.log("file", file);
      setFile((prevUrl) => {
        console.log("Updated file state:", prevUrl); // This will log the updated state
        setLoading(false);
        return imgUrl;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "person/noAvater.png"
            }
            alt=""
          />
          <input
            placeholder={`What's in your mind ${user?.data.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img
              className="shareImg"
              src={file}
              alt=""
            />
            <ClearIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <div className="shareBottom" onClick={() => submitHandler()}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => uploadImg(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feeling</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
