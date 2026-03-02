import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api";
import { Login } from "./pages/Login";
import { Portfolio } from "./pages/Portfolio";
import { Admin } from "./pages/Admin";

export interface User {
  id: number;
  email: string;
  role: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        // This ensures that if the token is valid, the user stays logged in on refresh
        const res = await api.get("/api/auth/me");
        setUser(res.data.user || res.data);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#0B0E14] text-blue-500">
      <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <Routes>
      {/* Portfolio is usually public, but we pass user status just in case */}
      <Route path="/" element={<Portfolio user={user} />} />

      <Route
        path="/login"
        element={user ? <Navigate to="/admin" replace /> : <Login setUser={setUser} />}
      />

      <Route
        path="/admin"
        element={user ? <Admin setUser={setUser} /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default App;