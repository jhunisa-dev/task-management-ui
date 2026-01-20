import { useState, useEffect } from "react";
import type { Task } from "../types/task";

interface ModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<Task>) => void; // Using Partial because we only send what changed
}

export default function TaskModal({ task, isOpen, onClose, onSave }: ModalProps) {
  // 1. Local state to hold form values
  const [formData, setFormData] = useState<Partial<Task>>({});

  // 2. Sync local state when the task prop changes (when a user clicks a different card)
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate
      });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    onSave(formData);   // Sends data to Tasks.tsx
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{task.id ? "Edit Task" : "New Task"}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        {/* 3. Added onSubmit here */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input 
            value={formData.title || ""} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />

          <label>Description</label>
          <textarea 
            value={formData.description || ""} 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3} 
          />

          <div className="form-row">
            <div>
              <label>Status</label>
              <select 
                value={formData.status} 
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
                value={formData.dueDate?.split('T')[0] || ""} 
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}