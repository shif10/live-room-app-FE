export const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: 25,
    maxWidth: 700,
    margin: "0 auto",
    fontFamily: "Inter, sans-serif",
  },
  occupiedNotice: {
    backgroundColor: "#ffcccc",
    color: "#a00",
    padding: "10px 15px",
    borderRadius: 8,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  noBookings: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200px", 
    color: "#555",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    color: "#222",
    marginBottom: 10,
    fontSize: 26,
    fontWeight: 700,
  },

  backBtn: {
    padding: "8px 14px",
    background: "#444",
    color: "#fff",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: 20,
  },

  roomCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // centers children horizontally
    justifyContent: "center", // optional: centers vertically if card has fixed height
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 8,
  },

  roomImage: {
    width: "50%",
    height: "50%",
    objectFit: "cover",
    borderRadius: 8,
    display: "block", // ensures margin auto works if needed
  },

 

  roomName: {
    fontSize: 20,
    fontWeight: 600,
    color: "#333",
    marginBottom:5,
  },

  sectionBox: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 600,
    color: "#333",
  },

  inputRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 15,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    display: "block",
    color: "#444",
    fontWeight: 500,
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 3,
  },

  bookBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
  },

  bookingCard: {
    background: "#fff",
    padding: 15,
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  booked: {
    borderLeft: "6px solid #28a745",
  },

  cancelled: {
    borderLeft: "6px solid #dc3545",
    opacity: 0.7,
  },

  status: {
    fontWeight: 700,
    fontSize: 14,
    color: "#444",
  },

  timeText: {
    marginTop: 5,
    color: "#555",
    fontSize: 14,
  },

  cancelBtn: {
    background: "#ff4d4f",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  disabledBtn: {
    background: "#ccc",
    color: "#666",
    padding: "8px 14px",
    borderRadius: 6,
    border: "none",
    fontWeight: "bold",
    cursor: "not-allowed",
  },
  };