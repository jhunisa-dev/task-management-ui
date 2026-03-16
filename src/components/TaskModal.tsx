import { useState, useEffect } from "react";
import type { Task } from "../types/task";

interface ModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<Task>) => void;
  users?: any[];
}

export default function TaskModal({ task, isOpen, onClose, onSave, users = [] }: ModalProps) {
  const [formData, setFormData] = useState<Partial<Task>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        // Map backend field 'assignedUserId' to form
        assignedUserId: task.assignedUserId 
      });
    } else {
      setFormData({ 
        title: "", 
        description: "", 
        status: "TODO", 
        dueDate: "",
        assignedUserId: undefined 
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSave: Partial<Task> = {
      ...formData,
      assignedUserId: formData.assignedUserId ? Number(formData.assignedUserId) : undefined 
    };
    
    onSave(dataToSave);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{task ? "Edit Task" : "New Task"}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input 
            value={formData.title || ""} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            placeholder="Task title"
          />

          <label>Description</label>
          <textarea 
            value={formData.description || ""} 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3} 
            placeholder="What needs to be done?"
          />

          {/* User Selection Dropdown */}
          {users && users.length > 0 && (
            <div className="form-group">
              <label>Assign User</label>
              <select 
                className="user-select"
                // Bind to assignedUserId
                value={formData.assignedUserId || ""} 
                onChange={(e) => setFormData({...formData, assignedUserId: Number(e.target.value)})}
              >
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.username}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-row">
            <div>
              <label>Status</label>
              <select 
                value={formData.status || "TODO"} 
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
            <div>
              <label>Due Date</label>
              <input 
                type="date" 
                value={formData.dueDate ? formData.dueDate.toString().split('T')[0] : ""} 
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">{task ? "Save Changes" : "Create Task"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}