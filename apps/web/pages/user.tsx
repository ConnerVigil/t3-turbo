import { User } from "@db/lib/generated/client";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface UserProps {
  user: User;
  handleDelete: (id: string) => void;
}

function User({ user, handleDelete }: UserProps): JSX.Element {
  return (
    <Box>
      <Stack direction="row" gap={2}>
        <Typography fontWeight="bold" variant="h5">
          {user.name}
        </Typography>
        <Typography variant="h5">{user.email}</Typography>
        <Typography variant="h6">{user.password}</Typography>
        <Typography variant="h6">{user.id}</Typography>
        <button
          onClick={() => {
            handleDelete(user.id);
          }}
          type="button"
        >
          Delete
        </button>
      </Stack>
    </Box>
  );
}

export default User;
