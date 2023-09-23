import { useState } from "react";
import { trpc } from "../util/trpc";
import { Grid, List, ListItem, Typography } from "@mui/material";
import Post from "./post";

function Posts(): JSX.Element {
  const mutation = trpc.addPost.useMutation();
  const query = trpc.getAll.useQuery();
  const deleteMutation = trpc.deletePost.useMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteMutation.mutateAsync({ id: id });
      query.refetch();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleAddPost = async () => {
    try {
      await mutation.mutateAsync({
        title,
        content,
      });
      query.refetch();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const posts = query.data ?? [];

  return (
    <div>
      <form onSubmit={handleAddPost}>
        <input
          id="post-title"
          onChange={(v) => {
            setTitle(v.target.value);
          }}
          placeholder="Title"
          value={title}
        />
        <input
          id="post-content"
          onChange={(v) => {
            setContent(v.target.value);
          }}
          placeholder="Content"
          value={content}
        />
        <button type="submit">Submit</button>
      </form>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <ListItem key={post.id}>
              <Post key={post.id} post={post} handleDelete={handleDelete} />
            </ListItem>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </List>
    </div>
  );
}

export default Posts;
