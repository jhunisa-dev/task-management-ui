// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import type { CSSProperties } from "react";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       await api.post("/auth/register", {
//         username,
//         email,
//         password
//       });
//       navigate("/login");
//     } catch (err: any) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Register</h2>

//       <input
//         placeholder="Username"
//         onChange={e => setUsername(e.target.value)}
//       />

//       <input
//         placeholder="Email"
//         onChange={e => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={e => setPassword(e.target.value)}
//       />

//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }

// const styles: { container: CSSProperties } = {
//   container: {
//     maxWidth: "400px",
//     margin: "2rem auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: "0.5rem"
//   }
// };

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "/Auth.css"; // Reuse the same CSS for consistency

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post("/auth/register", {
        username,
        email,
        password
      });
      // Redirect to login after successful registration
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join us today! It only takes a minute.</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Pick a unique username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}