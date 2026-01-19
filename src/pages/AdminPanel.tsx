import { useAuth } from "../auth/AuthContext";

export default function AdminPanel() {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") {
    return <h2>Access Denied</h2>;
  }

  return <h2>Admin Panel</h2>;
}
