import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");

      const myPosts = res.data.posts.filter(
        (post) => post.user === user?._id
      );

      setPosts(myPosts);
    } catch (err) {
      console.log(err);
    }
  };

  fetchPosts();
}, [user]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");

      const myPosts =
        res.data.posts.filter(
          (post) =>
            post.user === user?._id
        );

      setPosts(myPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const totalLikes = posts.reduce(
    (sum, post) =>
      sum + post.likes.length,
    0
  );

  const totalComments =
    posts.reduce(
      (sum, post) =>
        sum + post.comments.length,
      0
    );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background:
              "linear-gradient(45deg,#1976d2,#42a5f5)",
            margin: "auto",
          }}
        />

        <h2>{user?.username}</h2>

        <p>{user?.email}</p>

        <div
          style={{
            display: "flex",
            justifyContent:
              "center",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          <h3>
            Posts: {posts.length}
          </h3>

          <h3>
            Likes: {totalLikes}
          </h3>

          <h3>
            Comments: {totalComments}
          </h3>
        </div>
      </div>

      <h2>My Posts</h2>

      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            border:
              "1px solid #ddd",
            borderRadius: "15px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          {post.image && (
            <img
              src={`http://localhost:8000${post.image}`}
              alt=""
              width="100%"
              style={{
                borderRadius:
                  "10px",
              }}
            />
          )}

          <p>{post.text}</p>

          <p>
            ❤️ {
              post.likes.length
            } Likes
          </p>

          <p>
            💬 {
              post.comments
                .length
            } Comments
          </p>

          <small>
            {new Date(
              post.createdAt
            ).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Profile;