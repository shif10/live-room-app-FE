import React from "react";

interface SidebarProps {
  isAdmin?: boolean;
  user?: any;
  onCreateRoom?: () => void;
  styles?: any;
}

const Sidebar: React.FC<SidebarProps> = ({
  isAdmin,
  user,
  onCreateRoom,
  styles,
}) => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarBox}>
        <h3 style={styles.sectionTitle}>
          {isAdmin ? "Quick Actions" : "Your Profile"}
        </h3>

        {isAdmin && (
          <button onClick={onCreateRoom} style={styles.createLink}>
            + Create Room
          </button>
        )}

        <p style={styles.profileInfo}>
          Role: <b>{user?.role || "User"}</b>
        </p>
        <p style={styles.profileInfo}>Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default Sidebar;
