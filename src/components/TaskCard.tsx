import { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
  return (
    <div style={styles.card}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      <span style={styles.status}>{task.status}</span>

      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "1rem",
    borderRadius: "6px",
    marginBottom: "1rem"
  },
  status: {
    fontSize: "0.8rem",
    color: "#2563eb"
  }
};
