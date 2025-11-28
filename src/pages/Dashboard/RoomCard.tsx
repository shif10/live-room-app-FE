import { Link, useNavigate } from "react-router-dom";


const RoomCard = ({ room, isAdmin, onEdit, onDelete }: any) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/rooms/${room._id}/bookings`)}
    >
      <h3 style={{ margin: 0 }}>{room.name}</h3>
      <p style={{ color: "#777" }}>Capacity: {room.capacity}</p>

      <span
        style={{
          display: "inline-block",
          padding: "5px 20px",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 500,
          background: room.status === "available" ? "#d4edda" : "#f8d7da",
          color: room.status === "available" ? "#155724" : "#721c24",
        }}
      >
        {room.status.toUpperCase()}
      </span>

      <div style={{ marginTop: 15 }}>
        <img
          src={room.imageUrl}
          alt={room.name}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      </div>

      <Link
        style={{
          display: "block",
          background: "#007bff",
          color: "#fff",
          padding: "10px",
          borderRadius: 8,
          textAlign: "center",
          marginTop: 10,
          textDecoration: "none",   
        }}
        to={`/rooms/${room._id}/bookings`}
      >
        Bookings
      </Link>

      {isAdmin && (
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button
            style={{
              flex: 1,
              padding: "8px 0",
              background: "#007bff",
              color: "#fff",
              borderRadius: 8,
              border: "none",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(room);
            }}
          >
            Edit
          </button>

          <button
            style={{
              flex: 1,
              padding: "8px 0",
              background: "#ff4d4f",
              color: "#fff",
              borderRadius: 8,
              border: "none",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(room._id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomCard;
