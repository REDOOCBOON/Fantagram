import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

import { useState } from "react";
import API from "../services/api";

function CreatePostModal({
  open,
  handleClose,
  refreshPosts,
}) {
  const [text, setText] = useState("");
  const [image, setImage] =
    useState(null);

  const handleSubmit = async () => {
    try {
      const token =
        localStorage.getItem("token");

      let imageUrl = "";

      if (image) {
        const formData = new FormData();

        formData.append("image", image);

        const uploadRes =
          await API.post(
            "/posts/upload",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        imageUrl =
          uploadRes.data.imageUrl;
      }

      await API.post(
        "/posts",
        {
          text,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");
      setImage(null);

      refreshPosts();

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>
        Create Post
      </DialogTitle>

      <DialogContent>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="What's on your mind?"
        />

        <br />
        <br />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <br />
        <br />

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Post
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePostModal;