import { useState } from "react";
import { List, ListItem, Typography } from "@mui/material";
import { trpc } from "../util/trpc";
import User from "./user";

function Index(): JSX.Element {
  const addMutation = trpc.user.addUser.useMutation();
  const userQuery = trpc.user.getAll.useQuery();
  const deleteMutation = trpc.user.deleteUser.useMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDeleteUser = async (id: string): Promise<void> => {
    try {
      await deleteMutation.mutateAsync({ id });
      void userQuery.refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = async (): Promise<void> => {
    try {
      console.log("Adding user...");
      await addMutation.mutateAsync({
        name,
        email,
        password,
      });
      void userQuery.refetch();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const users = userQuery.data ?? [];

  return (
    <div>
      <Typography variant="h1">Users</Typography>
      <form onSubmit={handleAddUser}>
        <input
          id="user-name"
          onChange={(v) => {
            setName(v.target.value);
          }}
          placeholder="Name"
          value={name}
        />
        <input
          id="user-email"
          onChange={(v) => {
            setEmail(v.target.value);
          }}
          placeholder="Email"
          value={email}
        />
        <input
          id="user-password"
          onChange={(v) => {
            setPassword(v.target.value);
          }}
          placeholder="Password"
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {users.length > 0 ? (
          users.map((user) => (
            <ListItem key={user.id}>
              <User handleDelete={handleDeleteUser} user={user} />
            </ListItem>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </List>
    </div>
  );
}

export default Index;
