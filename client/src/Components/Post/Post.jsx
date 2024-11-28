import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format, render, cancel, register } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});
export { api };

export default function Post({ post }) {
  console.log(post);
  const [like, setLike] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const {user: currentUser} = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`users?userId=${post.userId}`);
        console.log(res);
        setUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    console.log(like);
    try {
      api.put("posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? +like - 1 : +like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user && user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user?.data?.profilePicture
                    ? PF + user?.data?.profilePicture
                    : PF + "person/noAvater.png"
                }
                alt=""
              />
            </Link>

            <span className="postUsername">{user?.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.image} alt="" /> 
          {/* pic display nahi ho rahi hai DB me ja rahi hia */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={() => likeHandler()}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={() => likeHandler()}
              alt=""
            />
            <span className="postLikeCounter">
              {post?.likes.length} people like it
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
