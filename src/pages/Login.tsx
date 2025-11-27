import { GoogleLogin } from "@react-oauth/google";
import { api } from "../api/axios";
import { useAuthStore } from "../context/authstore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse: any) => {
    try {
      const { data } = await api.post("/auth/login", {
        token: credentialResponse.credential,
      });

      setAuth(data.user, data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (e: any) {
      toast.error("Login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px 30px",
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: 350,
        }}
      >
        <h2 style={{ marginBottom: 20, color: "#333" }}>Welcome</h2>
        <p style={{ marginBottom: 30, color: "#555" }}>
          Please login with your Google account to continue
        </p>

        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => toast.error("Login failed")}
        />

        <div style={{ marginTop: 30, fontSize: 12, color: "#999" }}>
          By logging in, you agree to our <b>Terms of Service</b> and{" "}
          <b>Privacy Policy</b>.
        </div>
      </div>
    </div>
  );
};

export default Login;
