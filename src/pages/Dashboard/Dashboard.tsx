import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { useAuthStore } from "../../context/authstore";
import { socket } from "../../utills/socket";
import RoomModal from "../../components/RoomModel";
import DeleteConfirmationModal from "../../components/DeleteDialogModel";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { styles } from "./style";
import RoomCard from "./RoomCard";
import Sidebar from "./SideBar";

const Dashboard = () => {
  const user = useAuthStore((s) => s.user);
  const isAdmin = useAuthStore((s) => s.isAdmin);

  const [rooms, setRooms] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const [loading, setLoading] = useState(false);
  const fetchRooms = async () => {
    setLoading(true);
    const data = await api.get("/rooms/list");
    setRooms(data?.data.rooms);
    setLoading(false);
  };
  const confirmDelete = async () => {
    setLoading(true)
    if (!deleteRoomId) return;
    await api.delete(`/rooms/${deleteRoomId}`);
    toast.success("Delete Room Successfully");
    setDeleteRoomId(null);
    setLoading(false)
  };


  const cancelDelete = () => setDeleteRoomId(null);
  const handleDeleteRoom = (id: string) => {
    setDeleteRoomId(id); 
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    socket.on("room-created", (room) =>
      setRooms((prev: any) => [...prev, room])
    );
    socket.on("room-updated", (updated) =>
      setRooms((prev: any) =>
        prev.map((r: any) => {
          console.log(r, "the r", updated, "the updated");
          return r._id === updated._id ? updated : r;
        })
      )
    );
    socket.on("room-deleted", ({ roomId }) =>
      setRooms((prev: any) => prev.filter((r: any) => r._id !== roomId))
    );
    return () => {
      socket.off("room-created");
      socket.off("room-updated");
      socket.off("room-deleted");
      socket.off("booking-started");
      socket.off("booking-ended");
    };
  }, []);

  const closeModal = () => {
    setSelectedRoom(null);
    setShowCreate(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.page}>
  
      <div style={styles.main}>
      
        <Sidebar
          isAdmin={isAdmin}
          user={user}
          onCreateRoom={() => setShowCreate(true)}
          styles={styles}
        />

        <div style={styles.mainContent}>
          <h2 style={styles.mainTitle}>Available Rooms</h2>

          {rooms?.length === 0 ? (
            <p style={{ color: "#555" }}>No rooms created yet</p>
          ) : (
            <div style={styles.roomGrid}>
              {rooms?.map((room: any) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  isAdmin={isAdmin}
                  onEdit={(room: any) => setSelectedRoom(room)}
                  onDelete={(id: any) => handleDeleteRoom(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {(selectedRoom || showCreate) && (
        <RoomModal room={selectedRoom} onClose={closeModal} />
      )}
      {deleteRoomId && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete this room?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
