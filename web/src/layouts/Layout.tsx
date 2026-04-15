import type { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context";
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
    { name: "Exercises", path: "/exercises", icon: Dumbbell },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 sm:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    }`}
                  >
                    <link.icon size={16} />
                    <span className="hidden sm:inline">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-zinc-600 font-medium text-sm">
              {user}
            </span>
            <button
              onClick={handleLogout}
              className="flex gap-2 items-center p-1.5 text-zinc-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
};
