import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask, createTask } from "../services/taskService";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import DeleteConfirmModal from "../util/DeleteConfirmModal";
import "/Tasks.css"; 
import type { Task } from "../types/task";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.content || []);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const columns = [
    { id: "TODO", title: "To Do", color: "#94a3b8" },
    { id: "IN_PROGRESS", title: "In Progress", color: "#f59e0b" },
    { id: "DONE", title: "Done", color: "#10b981" }
  ];

  const handleDeleteAction = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTaskToDelete(task);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;
    try {
      await deleteTask(taskToDelete.id);
      setIsDeleteModalOpen(false);
      fetchTasks();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (updatedData: Partial<Task>) => {
  if (!selectedTask) return;
  
  try {
    if (selectedTask.id) {
        await updateTask(selectedTask.id, updatedData);
    } else {
        await createTask(updatedData);
    }
    
    setIsModalOpen(false);
    fetchTasks();
  } catch (err) {
    alert("Failed to save task. Please try again.");
  }
};

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    try {
      await updateTask(taskId, { status: newStatus as any });
      fetchTasks();
    } catch (err) {
      console.error("Drop failed", err);
    }
  };

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <h1>Project Board</h1>
        <p>Manage your workflow and deadlines.</p>
      </header>

      <div className="kanban-board">
        {columns.map((col) => (
          <div 
            key={col.id} 
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="column-header">
              <span className="dot" style={{ backgroundColor: col.color }}></span>
              <h3>{col.title}</h3>
              <span className="task-count">
                {tasks.filter((t) => t.status === col.id).length}
              </span>
            </div>

            <div className="column-body">
              {tasks
                .filter((t) => t.status === col.id)
                .map((taskItem) => (
                  <div 
                    key={taskItem.id} 
                    draggable 
                    onDragStart={(e) => handleDragStart(e, taskItem.id)}
                  >
                    <TaskCard 
                      task={taskItem} 
                      onDelete={handleDeleteAction} 
                      onEdit={handleEditClick} 
                    />

                    <DeleteConfirmModal 
                      isOpen={isDeleteModalOpen}
                      taskTitle={taskToDelete?.title || ""}
                      onClose={() => setIsDeleteModalOpen(false)}
                      onConfirm={confirmDelete}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        task={selectedTask} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTask}
      />

      <button className="fab-add" onClick={() => {
        setSelectedTask({ title: "", description: "", status: "TODO" } as Task);
        setIsModalOpen(true);
      }}>
        <span>+</span>
      </button>
    </div>
  );
}