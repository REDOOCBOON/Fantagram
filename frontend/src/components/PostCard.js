import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
  Box,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import DeleteIcon from "@mui/icons-material/Delete";

function PostCard({
  post,
  onLike,
  onComment,
  onDelete,
  currentUser,
  commentText,
  setCommentText,
}) {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 5,
        overflow: "hidden",
        boxShadow: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              background:
                "linear-gradient(45deg,#1976d2,#42a5f5)",
            }}
          >
            {post.username
              ?.charAt(0)
              ?.toUpperCase()}
          </Avatar>

          <Box>
            <Typography fontWeight="bold">
              {post.username}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {new Date(
                post.createdAt
              ).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {currentUser?._id ===
          post.user && (
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() =>
              onDelete(post._id)
            }
          >
            Delete
          </Button>
        )}
      </Box>

      {post.image && (
        <CardMedia
          component="img"
          image={`http://localhost:8000${post.image}`}
          alt="post"
          sx={{
            maxHeight: 500,
            objectFit: "cover",
          }}
        />
      )}

      <CardContent>
        <Typography sx={{ mb: 2 }}>
          {post.text}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
          }}
        >
          <Button
            startIcon={<FavoriteIcon />}
            color="error"
            variant="contained"
            onClick={() =>
              onLike(post._id)
            }
          >
            {post.likes.length}
          </Button>

          <Button
            startIcon={
              <ChatBubbleIcon />
            }
            variant="outlined"
          >
            {post.comments.length}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 2,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={
              commentText[post._id] || ""
            }
            onChange={(e) =>
              setCommentText({
                ...commentText,
                [post._id]:
                  e.target.value,
              })
            }
          />

          <Button
            variant="contained"
            onClick={() =>
              onComment(post._id)
            }
          >
            Send
          </Button>
        </Box>

        {post.comments.length > 0 && (
          <>
            <Divider sx={{ mb: 2 }} />

            {post.comments.map(
              (comment) => (
                <Box
                  key={comment._id}
                  sx={{
                    background:
                      "#f8f9fa",
                    p: 1.5,
                    borderRadius: 3,
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">
                    <strong>
                      {
                        comment.username
                      }
                    </strong>
                    : {comment.text}
                  </Typography>
                </Box>
              )
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default PostCard;