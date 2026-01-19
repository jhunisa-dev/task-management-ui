import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h3>Task Manager</h3>

      <div style={styles.links}>
        <Link to="/">Dashboard</Link>

        {user?.role === "ADMIN" && (
          <Link to="/admin">Admin</Link>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    backgroundColor: "#1f2937",
    color: "white"
  },
  links: {
    display: "flex",
    gap: "1rem",
    alignItems: "center"
  }
};
