import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      setUser({
        username: decoded.sub,
        role: decoded.role
      });
    } catch {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    loadUserFromToken();
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    loadUserFromToken();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
