// pages/register.js
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Register(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (): Promise<void> => {
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // Set to true if you want to redirect after registration
    });

    if (result?.error) {
      console.error("Registration failed:", result.error);
    } else {
      // Registration was successful
      // Redirect to a different page or show a success message
      console.log("Registration successful!");
    }
  };

  function handleRegister(): void {
    void register();
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
          type="text"
          value={username}
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          type="password"
          value={password}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
