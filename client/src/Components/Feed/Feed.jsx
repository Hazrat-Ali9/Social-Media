import { useContext, useEffect, useState } from "react";
import Post from "../Post/Post.jsx";
import Share from "../Share/Share.jsx";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default function Feed({ username }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  console.log(user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let res;
        if (user) {
          res = username
            ? await api.get("/posts/profile/" + username)
            : await api.get("/posts/timeline/" + user?.data?._id);

          if (res && res.data) {
            setPosts(
              res.data.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              })
            );
          } else {
            // Handle the case where res or res.data is undefined
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [username, user]); // useEffect does not depend on user?._id
  return (
    <div className="feed">
      <div className="feedWrapper">
        {!username || username === user?.data?.username ? <Share /> : ""}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
