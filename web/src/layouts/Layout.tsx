import type { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Dumbbell,
  LogOut,
  History as HistoryIcon,
  Activity,
} from "lucide-react";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Workouts", path: "/workouts", icon: Activity },
    { name: "History", path: "/history", icon: HistoryIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl text-slate-900"
            >
              <div className="p-1.5 bg-indigo-600 rounded-lg">
                <Dumbbell className="text-white" size={20} />
              </div>
              <span className="hidden xs:inline">
                Gym<span className="text-indigo-600">Log</span>
              </span>
            </Link>

            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                    location.pathname === link.path
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-slate-600 font-medium text-sm">
              Hi, {user}!
            </span>
            <button
              onClick={handleLogout}
              className="flex gap-2 items-center p-2 text-slate-400 hover:cursor-pointer hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
              <p>Logout</p>
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  );
};
