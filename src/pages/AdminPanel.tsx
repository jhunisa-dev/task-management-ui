// import { useAuth } from "../auth/AuthContext";

// export default function AdminPanel() {
//   const { user } = useAuth();

//   if (user?.role !== "ADMIN") {
//     return <h2>Access Denied</h2>;
//   }

//   return <h2>Admin Panel</h2>;
// }


import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getTasks, deleteTask } from "../services/taskService";
import type { Task } from "../types/task";
import "/AdminPanel.css";

export default function AdminPanel() {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const res = await getTasks(); // Assuming the backend returns all tasks for Admin
      setAllTasks(res.data.content || []);
    } catch (err) {
      console.error("Admin fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Admin Override: Are you sure you want to delete this task?")) {
      await deleteTask(id);
      fetchAdminData();
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
          <h1>Admin Control Panel</h1>
          <p>System-wide task oversight and management.</p>
        </div>
        <div className="admin-stats">
          <div className="mini-stat">
            <span className="label">Total System Tasks</span>
            <span className="value">{allTasks.length}</span>
          </div>
        </div>
      </header>

      <div className="admin-container">
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.map((task) => (
                <tr key={task.id}>
                  <td><span className="id-badge">#{task.id}</span></td>
                  <td>
                    <div className="task-cell">
                      <span className="title">{task.title}</span>
                      <span className="desc">{task.description?.substring(0, 40)}...</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill ${task.status.toLowerCase()}`}>
                      {task.status.replace("_", " ")}
                    </span>
                  </td>
                  <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}</td>
                  <td>
                    <button className="admin-delete-btn" onClick={() => handleDelete(task.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {allTasks.length === 0 && !loading && (
            <p className="empty-msg">No tasks found in the system.</p>
          )}
        </div>
      </div>
    </div>
  );
}