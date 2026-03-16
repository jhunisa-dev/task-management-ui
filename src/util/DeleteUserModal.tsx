interface DeleteUserProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function DeleteUserModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  userName 
}: DeleteUserProps) {
  
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal">
        <div className="delete-icon">⚠️</div>
        <h3>Delete User?</h3>
        <p>
          Are you sure you want to delete user <strong>"{userName}"</strong>? 
          <br /><br />
          <span style={{ color: '#ef4444', fontSize: '0.9rem' }}>
            Warning: All tasks assigned to this user will also be permanently deleted.
          </span>
        </p>
        
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            No, Keep User
          </button>
          <button className="delete-confirm-btn" onClick={onConfirm}>
            Yes, Delete User
          </button>
        </div>
      </div>
    </div>
  );
}