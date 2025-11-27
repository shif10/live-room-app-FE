import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../context/authstore";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { socket } from "../../utills/socket";
import toast from "react-hot-toast";
import moment from "moment";
import { styles } from "./style";

export interface IBooking {
  _id: string;
  roomId: string;
  userId: string;
  startTime: string;
  endTime: string;
  status: "booked" | "cancelled";
}



const Bookings = () => {
  const { id: roomId } = useParams();
  const user = useAuthStore((s) => s.user);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [startTime, setStart] = useState("");
  const [endTime, setEnd] = useState("");
  const navigate = useNavigate();

  const bookingAPI = {
    book: (data: any) => api.post("/booking/book", data),
    cancel: (bookingId: string) =>
      api.post("/booking/room/cancel", { bookingId }),
    listByRoom: (roomId: string) => api.get(`/booking/room/${roomId}`),
  };

  const loadBookings = async () => {
    const { data } = await bookingAPI.listByRoom(roomId!);
    setBookings(data.bookings);
  };


  const createBooking = async () => {
    try {
      await bookingAPI.book({
        roomId,
        userId: user?._id,
        startTime,
        endTime,
      });
      toast.success("Booking created");
      setStart("");
      setEnd("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      await bookingAPI.cancel(bookingId);
      toast.success("Booking cancelled");
    } catch (err) {
      toast.error("Failed to cancel");
    }
  };

  useEffect(() => {
    loadBookings();

    socket.on("booking-created", (b: IBooking) => {
      if (b.roomId === roomId) setBookings((prev) => [...prev, b]);
    });

    socket.on("booking-cancelled", ({ bookingId }) => {
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    });

    return () => {
      socket.off("booking-created");
      socket.off("booking-cancelled");
    };
  }, []);
  return (
    <div style={styles.page}>
      <div>
        <button
          style={styles.bookBtn}
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Dashboard
        </button>
      </div>
      <h2 style={{ marginBottom: 20, color: "#333" }}>Room Bookings</h2>

      
      <div style={styles.sectionBox}>
        <h4 style={styles.sectionTitle}>Create Booking</h4>
        <div style={styles.inputRow}>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStart(e.target.value)}
            style={styles.input}
          />

          <input
            type="datetime-local"
            value={endTime}
            min={startTime ? moment(startTime).format("YYYY-MM-DDTHH:mm") : ""}
            onChange={(e) => setEnd(e.target.value)}
            style={styles.input}
          />
        </div>
        <button
          onClick={createBooking}
          style={styles.bookBtn}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "#0056b3")
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "#007bff")
          }
        >
          Book
        </button>
      </div>

     
      <h4 style={styles.sectionTitle}>Next Existing Bookings </h4>

      {bookings.map((b) => (
        <div
          key={b._id}
          style={{
            ...styles.bookingCard,
            ...(b.status === "booked" ? styles.booked : styles.cancelled),
          }}
        >
          <div>
            <b style={styles.statusText}>{b.status}</b>
            <div style={styles.bookingTime}>
              {moment(b.startTime).format("DD-MM-YYYY hh:mm A")} →{" "}
              {moment(b.endTime).format("DD-MM-YYYY hh:mm A")}
            </div>
          </div>

          {b.status === "booked" && (
            <button
              style={styles.cancelBtn}
              onClick={() => cancelBooking(b._id)}
            >
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Bookings;
