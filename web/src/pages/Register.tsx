import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context";
import { UserPlus, Mail, Lock, User, AlertCircle } from "lucide-react";
import { AxiosError } from "axios";

// move types into separate file
interface RegisterApiErrorResponse {
  errors?: string[];
  message?: string;
}

export const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      await register(userName, email, password);
      navigate("/workouts");
    } catch (err) {
      const axiosError = err as AxiosError<RegisterApiErrorResponse>;

      const serverErrors = axiosError.response?.data?.errors;
      const genericMessage =
        axiosError.response?.data?.message || "Registration failed.";

      if (serverErrors && Array.isArray(serverErrors)) {
        setErrors(serverErrors);
      } else {
        setErrors([genericMessage]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-2xl shadow-2xl shadow-slate-200/60">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-500 p-3 rounded-xl mb-4 shadow-lg shadow-emerald-200">
            <UserPlus className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Create account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-500 text-xs uppercase font-bold mb-2 ml-1">
              Username
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                className="w-full bg-white border border-slate-300 rounded-xl px-10 py-3 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 text-xs uppercase font-bold mb-2 ml-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="email"
                className="w-full bg-white border border-slate-300 rounded-xl px-10 py-3 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 text-xs uppercase font-bold mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="password"
                className="w-full bg-white border border-slate-300 rounded-xl px-10 py-3 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl space-y-2">
              {errors.map((msg, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-red-600 text-sm"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{msg}</span>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-100 transition duration-200 transform active:scale-[0.98]"
          >
            Register
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-semibold hover:text-emerald-700 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
