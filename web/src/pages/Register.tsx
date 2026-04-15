import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context";
import { UserPlus, Mail, Lock, User, AlertCircle } from "lucide-react";
import { ApiError } from "@/api/api";
import type { RegisterApiErrorResponse } from "@/types/responses";

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
      const axiosError = err as ApiError<RegisterApiErrorResponse>;

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
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white border border-zinc-200 p-8 rounded-xl shadow-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-50 p-3 rounded-full mb-4">
            <UserPlus className="text-blue-600" size={28} />
          </div>
          <h2 className="text-2xl font-medium text-zinc-900">Create account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-500 text-xs font-medium mb-1.5 ml-1">
              Username
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={16}
              />
              <input
                type="text"
                className="w-full bg-transparent border border-zinc-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-500 text-xs font-medium mb-1.5 ml-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={16}
              />
              <input
                type="email"
                className="w-full bg-transparent border border-zinc-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-500 text-xs font-medium mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={16}
              />
              <input
                type="password"
                className="w-full bg-transparent border border-zinc-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-100 p-3 rounded-lg space-y-1.5 mt-2">
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition text-sm mt-2"
          >
            Register
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-100 text-center">
          <p className="text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline transition-all"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
