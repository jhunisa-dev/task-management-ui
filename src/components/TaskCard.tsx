// import { Task } from "../types/task";

// interface Props {
//   task: Task;
//   onDelete: (id: number) => void;
// }

// export default function TaskCard({ task, onDelete }: Props) {
//   return (
//     <div style={styles.card}>
//       <h4>{task.title}</h4>
//       <p>{task.description}</p>

//       <span style={styles.status}>{task.status}</span>

//       <button onClick={() => onDelete(task.id)}>Delete</button>
//     </div>
//   );
// }

// const styles = {
//   card: {
//     border: "1px solid #ccc",
//     padding: "1rem",
//     borderRadius: "6px",
//     marginBottom: "1rem"
//   },
//   status: {
//     fontSize: "0.8rem",
//     color: "#2563eb"
//   }
// };

import { type Task } from "../types/task";
import "/TaskCard.css";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void; // 1. Add this prop
}

export default function TaskCard({ task, onDelete, onEdit }: Props) {
  return (
    // 2. Call onEdit(task) instead of console.log
    <div className="task-card" onClick={() => onEdit(task)}>
      <div className="task-card-header">
        <span className={`priority-indicator ${task.priority?.toLowerCase() || 'medium'}`}></span>
        <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>
          ×
        </button>
      </div>
      
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      <div className="task-card-footer">
        {/* Note: In your console log, the field was called 'dueDate'. 
            I've updated this to check both just in case. */}
        {(task.dueDate || (task as any).dueDate) && (
          <div className="task-date">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            {new Date(task.dueDate || (task as any).dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}