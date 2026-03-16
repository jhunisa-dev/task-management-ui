// import { useEffect, useState } from "react";
// import { getTasks, deleteTask, updateTask, createTask } from "../services/taskService";
// import TaskCard from "../components/TaskCard";
// import TaskModal from "../components/TaskModal";
// import DeleteConfirmModal from "../util/DeleteConfirmModal";
// import "/Tasks.css"; 
// import type { Task } from "../types/task";

import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask, createTask, getAllUsers } from "../services/taskService";
import { useAuth } from "../auth/AuthContext"; // Import Auth to check role
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import DeleteTaskModal from "../util/DeleteTaskModal";
import "/Tasks.css"; 
import type { Task } from "../types/task";

export default function Tasks() {
  const { user } = useAuth(); // Get current user info
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<any[]>([]); // To store the list of users for Admin
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    fetchTasks();
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data.content || []);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
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
    } catch (err: any) {
      if (err.response && err.response.status === 403) {
        alert("You do not have permission to delete this task.");
      } else {
        console.error("Delete failed", err);
        alert("Delete failed. Please try again.");
      }
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (updatedData: Partial<Task>) => {
    try {
      if (selectedTask && selectedTask.id) {
        // UPDATE MODE
        await updateTask(selectedTask.id, updatedData);
      } else {
        // CREATE MODE (This was unreachable before)
        await createTask(updatedData);
      }
      
      setIsModalOpen(false);
      fetchTasks();
    } catch (err) {
      console.error("Save failed", err);
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
        <p>{isAdmin ? "System-wide Task Management" : "Manage your workflow and deadlines."}</p>
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
                    {/* Pass users list to TaskCard if you want to show assignee name there too */}
                    <TaskCard 
                      task={taskItem} 
                      onDelete={handleDeleteAction} 
                      onEdit={handleEditClick}
                      users={users} 
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* TaskModal now receives the users list for the dropdown */}
      <TaskModal 
        isOpen={isModalOpen} 
        task={selectedTask} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTask}
        users={isAdmin ? users : []}
      />

      {/* Moved outside the loop for performance */}
      <DeleteTaskModal 
        isOpen={isDeleteModalOpen}
        taskTitle={taskToDelete?.title || ""}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <button className="fab-add" onClick={() => {
        setSelectedTask(null);
        setIsModalOpen(true);
      }}>
        <span>+</span>
      </button>
    </div>
  );
}