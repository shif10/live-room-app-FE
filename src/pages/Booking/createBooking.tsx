import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../context/authstore";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { socket } from "../../utills/socket";
import toast from "react-hot-toast";
import moment from "moment";
import { useForm } from "react-hook-form";
import Loader from "../../components/Loader";
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
  const [room, setRoom] = useState<any>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  const bookingAPI = {
    book: (data: any) => api.post("/booking/book", data),
    cancel: (bookingId: string) =>
      api.post("/booking/room/cancel", { bookingId }),
    listByRoom: (roomId: string) => api.get(`/booking/room/${roomId}`),
    getRoom: (roomId: string) => api.get(`/rooms/${roomId}`),
  };

  const fetchRooms = async () => {
    const { data } = await bookingAPI.getRoom(roomId!);
    setRoom(data?.room);
  };

  const loadBookings = async () => {
    setLoading(true);
    const { data } = await bookingAPI.listByRoom(roomId!);
    setBookings(data.bookings);
    await fetchRooms();

    setLoading(false);
  };

  const createBooking = async (data: any) => {
    try {
      await bookingAPI.book({
        roomId,
        userId: user?._id,
        startTime: moment(data.startTime).utc().format(),
        endTime: moment(data.endTime).utc().format(),
      });

      toast.success("Booking created");
      reset();
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
  console.log(room, "the room");
  if (loading) return <Loader />;

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate("/")}>
        ⬅ Back to Dashboard
      </button>

      <h2 style={styles.heading}>Room Bookings</h2>

      {/* Room Card */}
      <div style={styles.roomCard}>
        <h2 style={styles.roomName}>{room?.name}</h2>
        <img src={room?.imageUrl} alt="Room" style={styles.roomImage} />
      </div>

      {/* Create Booking */}
      <div style={styles.sectionBox}>
        <h4 style={styles.sectionTitle}>Create Booking</h4>

        <form onSubmit={handleSubmit(createBooking)}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "15px",
            }}
          >
           
            <div style={{ flex: 1 }}>
              <label>Start Time</label>
              <input
                type="datetime-local"
                style={{
                  ...styles.input,
                  width: "70%",
                  margin: 10,
                }}
                {...register("startTime", {
                  required: "Start time is required",
                })}
              />
              {errors.startTime && (
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors.startTime.message}
                </p>
              )}
            </div>

           
            <div style={{ flex: 1 }}>
              <label>End Time</label>
              <input
                type="datetime-local"
                style={{
                  ...styles.input,
                  width: "70%",
                  margin: 10,
                }}
                min={
                  watch("startTime")
                    ? moment(watch("startTime")).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                {...register("endTime", {
                  required: "End time is required",
                  validate: (value) => {
                    const start = watch("startTime");
                    if (!start) return true;
                    return (
                      new Date(value) > new Date(start) ||
                      "End time must be after start time"
                    );
                  },
                })}
              />
              {errors.endTime && (
                <p style={{ color: "red", fontSize: 12 }}>
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          <button type="submit" style={styles.bookBtn}>
            Book Now
          </button>
        </form>
      </div>
      {room?.status === "occupied" && (
        <div style={styles.occupiedNotice}>
          ⚠️ This room is currently occupied!
        </div>
      )}
      <h4 style={styles.sectionTitle}>Upcoming Bookings</h4>

      {!bookings.length ? (
        <>
         
          <div style={styles.noBookings}>
            <h1>No BOOKINGS</h1>
          </div>
        </>
      ) : (
        bookings.map((b) => (
          <div
            key={b._id}
            style={{
              ...styles.bookingCard,
              ...(b.status === "booked" ? styles.booked : styles.cancelled),
            }}
          >
            <div>
              <span style={styles.status}>{b.status.toUpperCase()}</span>
              <div style={styles.timeText}>
                {moment(b.startTime).format("DD-MM-YYYY hh:mm A")} →{" "}
                {moment(b.endTime).format("DD-MM-YYYY hh:mm A")}
              </div>
            </div>

            {b.status === "booked" && (
              <button
                style={
                  b.userId === user?._id ? styles.cancelBtn : styles.disabledBtn
                }
                disabled={b.userId !== user?._id}
                onClick={() => cancelBooking(b._id)}
              >
                Cancel
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Bookings;
