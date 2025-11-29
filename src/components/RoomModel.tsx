import { useForm } from "react-hook-form";
import { api } from "../api/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "./Loader";

interface RoomModalProps {
  room?: any; 
  onClose: () => void;
 
}
interface RoomFormFields {
  name: string;
  capacity: number | string;
  status: string;
  image?: FileList;
}
const RoomModal = ({ room, onClose }: RoomModalProps) => {
  const isEdit = !!room;
  
  const [preview, setPreview] = useState<string | null>(room?.imageUrl || null);
 const [loading,setLoading]=useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<RoomFormFields>({
    defaultValues: room ? {
      name: room.name,
      capacity: room.capacity,
      status: room.status,
    } : {
      name: "",
      capacity: "",
      status: "available",
      
    }
    
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("capacity", data.capacity);
      const file = (data.image as FileList)?.[0];
      if (file) formData.append("image", file);
      if (isEdit) {
      await api.put(`/rooms/${room._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Room updated successfully");
      } else {
      await api.post("/rooms/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Room created successfully");
      }

      setLoading(false)
      onClose();
    } catch (err) {
      toast.error(`Failed to ${isEdit ? "update" : "create"} room`);
    }
  };
  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  if(loading)
  {
    return <Loader/>
  }
  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>&times;</button>
        <h3 style={styles.title}>{isEdit ? "Edit Room" : "Create Room"}</h3>

        <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div style={styles.formGroup}>
            <label>Room Name</label>
            <input
              {...register("name", { required: "Room name is required" })}
              style={styles.input}
              placeholder="Room Name"
            />
            {errors.name?.message && (
              <p style={styles.error}>{String(errors.name.message)}</p>
            )}
          </div>

          <div style={styles.formGroup}>
            <label>Capacity</label>
            <input
              type="number"
              {...register("capacity", { required: "Capacity is required" })}
              style={styles.input}
              placeholder="Capacity"
            />
            {errors.capacity?.message && (
              <p style={styles.error}>{String(errors.capacity.message)}</p>
            )}
          </div>

          <div style={styles.formGroup}>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
            />
          </div>

          {/* PREVIEW IMAGE */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                borderRadius: 8,
                marginTop: 10,
              }}
            />
          )}

          <div style={styles.buttons}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.updateBtn}>{isEdit ? "Update" : "Create"}</button>
          </div>
        </form>
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
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    width: 350,
    position: "relative",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    border: "none",
    background: "transparent",
    fontSize: 20,
    cursor: "pointer",
  },
  title: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  input: {
    padding: "8px 10px",
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelBtn: {
    padding: "8px 15px",
    borderRadius: 5,
    border: "1px solid #ccc",
    background: "#f0f0f0",
    cursor: "pointer",
  },
  updateBtn: {
    padding: "8px 15px",
    borderRadius: 5,
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
};

export default RoomModal;
