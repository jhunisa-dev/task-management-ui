// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav style={styles.nav}>
//       <h3>Task Manager</h3>

//       <div style={styles.links}>
//         <Link to="/">Dashboard</Link>

//         {user?.role === "ADMIN" && (
//           <Link to="/admin">Admin</Link>
//         )}

//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     </nav>
//   );
// }

// const styles = {
//   nav: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "1rem",
//     backgroundColor: "#1f2937",
//     color: "white"
//   },
//   links: {
//     display: "flex",
//     gap: "1rem",
//     alignItems: "center"
//   }
// };

import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "/Navbar.css";

export default function Navbar() {
  const { logout, user } = useAuth(); // Assuming user object contains the name
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <div className="logo-icon"></div>
        <span>TaskFlow</span>
      </div>

      <div className="sidebar-user">
        <div className="avatar">{user?.username?.charAt(0).toUpperCase() || "U"}</div>
        <div className="user-info">
          <p className="user-name">{user?.username || "User"}</p>
          {/* <p className="user-role">Member</p> */}
        </div>
      </div>

      <div className="sidebar-menu">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Tasks
        </NavLink>
        
        {/* Show Admin Panel only if user is an ADMIN */}
        {user?.role === "ADMIN" && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Admin Panel
          </NavLink>
        )}
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}