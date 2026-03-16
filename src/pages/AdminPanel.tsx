import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getAllUsers, deleteUser, createUser } from "../services/userService";
import type { User } from "../types/user";

// IMPORTANT: Adjust this path based on where you saved the modal component!
import DeleteUserModal from "../util/DeleteUserModal"; 
import "/AdminPanel.css";

export default function AdminPanel() {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Add User State
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Delete Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setAllUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  // Triggers the modal to open
  const handleDeleteClick = (userToKill: User) => {
    setUserToDelete(userToKill);
    setIsModalOpen(true);
  };

  // Actually executes the delete request
  const confirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await deleteUser(userToDelete.id);
      fetchUsers(); 
      setIsModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      await createUser({
        username: newUsername,
        email: newEmail,
        password: newPassword,
      });
      setNewUsername("");
      setNewEmail("");
      setNewPassword("");
      fetchUsers();
    } catch (error) {
      alert("Failed to create user. Ensure username/email is unique.");
    } finally {
      setIsAdding(false);
    }
  };

  if (user?.role !== "ADMIN") {
    return (
      <div className="access-denied">
        <div className="denied-card">
          <h1>🔐 Access Denied</h1>
          <p>You do not have administrative privileges to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1>User Management Panel</h1>
          <p>System-wide user oversight and administration.</p>
        </div>
        <div className="admin-stats">
          <div className="mini-stat">
            <span className="label">Total Users</span>
            <span className="value">{allUsers.length}</span>
          </div>
        </div>
      </header>

      <div className="admin-container">
        
        <div className="add-user-section">
          <h3>Add New User</h3>
          <form onSubmit={handleAddUser} className="add-user-form">
            <input 
              type="text" 
              placeholder="Username" 
              value={newUsername} 
              onChange={(e) => setNewUsername(e.target.value)} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={newEmail} 
              onChange={(e) => setNewEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
            <button type="submit" className="add-user-btn" disabled={isAdding}>
              {isAdding ? "Adding..." : "Create User"}
            </button>
          </form>
        </div>

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
                <tr key={u.id}>
                  <td><span className="id-badge">#{u.id}</span></td>
                  <td><span className="title">{u.username}</span></td>
                  <td><span className="desc">{u.email}</span></td>
                  <td>
                    <span className={`status-pill ${u.role.toLowerCase()}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    {user.username !== u.username && (
                      <button 
                        className="admin-delete-btn" 
                        onClick={() => handleDeleteClick(u)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {allUsers.length === 0 && !loading && (
            <p className="empty-msg">No users found in the system.</p>
          )}
        </div>
      </div>

      {/* REUSABLE DELETE MODAL */}
      <DeleteUserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        userName={userToDelete?.username || ""} 
      />
    </div>
  );
}