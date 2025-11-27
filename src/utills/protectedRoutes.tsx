import { Navigate } from "react-router-dom";
import { useAuthStore } from "../context/authstore";


export default function ProtectedRoute({ children }: any) {
  const token = useAuthStore((s) => s.token);
   console.log(token,"the token");
  if (!token) return <Navigate to="/login" />;

  return children;
}
