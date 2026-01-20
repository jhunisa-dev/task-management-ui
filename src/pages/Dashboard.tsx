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
    .filter(t => t.status !== "DONE" && t.deadline) 
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
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
              {urgentTasks.map(task => (
                <div key={task.id} className="task-item">
                  <div className="task-info">
                    <span className="task-title">{task.title}</span>
                    <span className="task-deadline">
                        {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`status-badge ${task.status.toLowerCase()}`}>
                    {task.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-tasks">All caught up! No urgent deadlines.</p>
          )}
        </div>
      </div>
    </div>
  );
}