interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, taskTitle }: DeleteProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <div className="delete-icon">⚠️</div>
        <h3>Delete Task?</h3>
        <p>
          Are you sure you want to delete <strong>"{taskTitle}"</strong>? 
          This action cannot be undone.
        </p>
        
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            No, Keep it
          </button>
          <button className="delete-confirm-btn" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}