import { useAuth } from "../auth/AuthContext";

export default function AdminPanel() {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") return <p>Access Denied</p>;

  return <h2>Admin Panel</h2>;
}
