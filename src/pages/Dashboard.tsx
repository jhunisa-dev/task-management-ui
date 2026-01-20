import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import { useAuth } from "../auth/AuthContext";
import "/Dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getTasks().then(res => {
        setTasks(res.data.content || []);
    });
  }, []);

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === "TODO").length,
    inProgress: tasks.filter(t => t.status === "IN_PROGRESS").length,
    done: tasks.filter(t => t.status === "DONE").length,
  };

  const urgentTasks = tasks
  .filter(t => t.status !== "DONE" && (t.dueDate || t.deadline)) 
  .sort((a, b) => {
    const dateA = new Date(a.dueDate || a.deadline).getTime();
    const dateB = new Date(b.dueDate || b.deadline).getTime();
    return dateA - dateB;
  })
  .slice(0, 3);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Welcome back, {user?.username || "Guest"}! 👋</h1>
        <p>You have {stats.todo} tasks left to start today.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card todo">
          <span className="stat-label">To Do</span>
          <span className="stat-value">{stats.todo}</span>
        </div>
        <div className="stat-card progress">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{stats.inProgress}</span>
        </div>
        <div className="stat-card done">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{stats.done}</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="urgent-section">
          <h3>Deadlines Approaching</h3>
          {urgentTasks.length > 0 ? (
            <div className="task-list">
              {urgentTasks.map(task => {
                const displayDate = task.dueDate || task.deadline; // Use whichever is available
                return (
                  <div key={task.id} className="task-item">
                    <div className="task-info">
                      <div className="task-main">
                        <span className="task-title">{task.title}</span>
                        <span className={`status-badge ${task.status.toLowerCase()}`}>
                          {task.status.replace("_", " ")}
                        </span>
                      </div>
                      {/* Moved the date into its own container for alignment */}
                      <span className="task-deadline">
                        {displayDate ? new Date(displayDate).toLocaleDateString() : "No Date"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="no-tasks">All caught up! No urgent deadlines.</p>
          )}
        </div>
      </div>
    </div>
  );
}