import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // 1. Import Navigate
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      {/* Note: Currently this Navbar will show on the Login page too. 
          See the tip below if you want to hide it on Login. */}
      <Navbar /> 

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {/* 2. CHANGED: path="/" to path="/dashboard" to match Login.js */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* 3. NEW: Redirect root "/" to "/login" automatically */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Optional: Catch-all for 404s, redirects back to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;