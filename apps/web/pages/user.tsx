import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface UserProps {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  handleDelete: (id: string) => Promise<void>;
}

function User({ user, handleDelete }: UserProps): JSX.Element {
  return (
    <Box>
      <Stack direction="row" gap={2}>
        <Typography fontWeight="bold" variant="h5">
          {user.name}
        </Typography>
        <button
          onClick={() => {
            void handleDelete(user.id);
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
