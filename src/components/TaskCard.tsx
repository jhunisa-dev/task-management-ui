import { type Task } from "../types/task";
import { useAuth } from "../auth/AuthContext"; // Import Auth Context
import "/TaskCard.css";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  users: any[]; 
}

export default function TaskCard({ task, onDelete, onEdit, users }: Props) {
  // 1. Get the current logged-in user
  const { user } = useAuth(); 
  
  // Find the assignee from the users list
  const assignee = users.find(u => u.id === task.assignedUserId);
  
  // Helper for due date to keep the JSX clean
  const taskDate = task.dueDate || (task as any).dueDate;

  return (
    <div className="task-card" onClick={() => onEdit(task)}>
      <div className="task-card-header">
        {/* <span className={`priority-indicator ${task.priority?.toLowerCase() || 'medium'}`}></span> */}
        <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>
          ×
        </button>
      </div>
      
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      <div className="task-card-footer">
        
        {/* 2. ONLY render this block if the user is an ADMIN */}
        {user?.role === "ADMIN" && (
          <div className="task-card-assignee">
            {task.assignedUserId ? (
              <span className="user-tag">
                👤 @{assignee?.username || 'User ' + task.assignedUserId}
              </span>
            ) : (
              <span className="unassigned-tag">Unassigned</span>
            )}
          </div>
        )}

        {/* 3. ALWAYS render the due date if it exists */}
        {taskDate && (
          <div className="task-date">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {new Date(taskDate).toLocaleDateString()}
          </div>
        )}
        
      </div>    
    </div>
  );
}