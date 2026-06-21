import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ email: "user@ocean.com", tier: "member" });
    navigate("/dashboard");
  };

  return (
    <div className="p-10">
      <h1>Join the Wave 🌊</h1>
      <button onClick={handleLogin}>
        Enter Members Area
      </button>
    </div>
  );
}