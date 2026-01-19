import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        username,
        email,
        password
      });
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

const styles: { container: CSSProperties } = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  }
};
