// pages/register.js
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

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

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
