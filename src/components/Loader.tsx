import React from "react";

// Simple Spinner Loader
export const Loader = ({
  size = 40,
  color = "#007bff",
}: {
  size?: number;
  color?: string;
}) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    border: `${size / 8}px solid #f3f3f3`,
    borderTop: `${size / 8}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
      }}
    >
      {" "}
      <div style={style}></div>{" "}
      <style>
        {`           @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}{" "}
      </style>{" "}
    </div>
  );
};

export default Loader;
