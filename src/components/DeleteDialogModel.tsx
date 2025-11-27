interface DeleteConfirmationModalProps {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal = ({
  message = "Are you sure you want to delete?",
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) => {
  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttons}>
          <button
            style={styles.cancelBtn}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            style={styles.deleteBtn}
            onClick={(e) => {
              onConfirm();
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    width: 300,
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  message: {
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: "8px 0",
    borderRadius: 5,
    border: "1px solid #ccc",
    background: "#f0f0f0",
    cursor: "pointer",
  },
  deleteBtn: {
    flex: 1,
    padding: "8px 0",
    borderRadius: 5,
    border: "none",
    background: "#ff4d4f",
    color: "#fff",
    cursor: "pointer",
  },
};

export default DeleteConfirmationModal;
