import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, userTier, requiredTier }) {
  const tiers = ["free", "bronze", "wave", "tsunami"];

  const userIndex = tiers.indexOf(userTier);
  const requiredIndex = tiers.indexOf(requiredTier);

  const allowed = userIndex >= requiredIndex;

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}