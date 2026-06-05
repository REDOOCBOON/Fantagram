import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [openCreateModal, setOpenCreateModal] =
    useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (postId) => {
    try {
      const token =
        localStorage.getItem("token");

      await API.put(
        `/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (postId) => {
    try {
      const token =
        localStorage.getItem("token");

      const text = commentText[postId];

      if (!text || text.trim() === "") {
        return;
      }

      await API.post(
        `/posts/${postId}/comment`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentText({
        ...commentText,
        [postId]: "",
      });

      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token =
        localStorage.getItem("token");

      const confirmDelete =
        window.confirm(
          "Delete this post?"
        );

      if (!confirmDelete) {
        return;
      }

      await API.delete(
        `/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          padding: "20px",
          paddingBottom: "100px",
        }}
      >
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onDelete={handleDelete}
            currentUser={currentUser}
            commentText={commentText}
            setCommentText={setCommentText}
          />
        ))}
      </div>

      <CreatePostModal
        open={openCreateModal}
        handleClose={() =>
          setOpenCreateModal(false)
        }
        refreshPosts={fetchPosts}
      />

      <BottomNav
        onCreatePost={() =>
          setOpenCreateModal(true)
        }
      />
    </>
  );
}

export default Feed;