import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Stack } from "@mui/material";

function Header(): JSX.Element {
  const { data: session } = useSession();

  return (
    <Stack direction="row">
      <h1>T3-app</h1>
      {session ? (
        <div>
          Signed in as session <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </Stack>
  );
}

export default Header;
