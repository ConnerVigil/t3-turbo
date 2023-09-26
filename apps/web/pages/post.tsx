import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    likes: number;
  };
  handleDelete: (id: string) => void;
}

const Post = ({ post, handleDelete }: PostProps) => {
  return (
    <Box>
      <Stack direction={"row"} gap={2}>
        <h2>{post.title}</h2>
      </Stack>
      <Typography variant="caption">{post.content}</Typography>
      <p>Likes: {post.likes}</p>
      <button
        onClick={() => {
          handleDelete(post.id);
        }}
        type="button"
      >
        Delete
      </button>
    </Box>
  );
};

export default Post;
