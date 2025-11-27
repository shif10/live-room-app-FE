
import { useAuthStore } from "../context/authstore";

const styles = {
  topNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#007bff",
    color: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  logoutBtn: {
    padding: "6px 12px",
    borderRadius: 6,
    border: "none",
    background: "#ff4d4f",
    color: "#fff",
    cursor: "pointer",
  },
};
const TopNav = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const handleLogout = () => logout();
  return (
    <nav style={styles.topNav}>
      <h1 style={{ margin: 0, fontSize: 20 }}>Live Room Dashboard</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <span>{user?.name}</span>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
