import { useState } from "react";
import { useAuth } from "@/context";
import { useNavigate, Link } from "react-router-dom";
import type { ApiError } from "@/api/api";
import { AlertCircle } from "lucide-react";
import type { LoginApiErrorResponse } from "@/types/responses";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string>();

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/workouts");
    } catch (ex) {
      const axiosError = ex as ApiError<LoginApiErrorResponse>;

      const serverError = axiosError.response?.data?.error;
      const genericMessage =
        axiosError.response?.data?.message || "Failed to log in.";

      if (serverError) {
        setError(serverError);
      } else {
        setError(genericMessage);
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl border border-zinc-200 w-full max-w-sm shadow-sm"
      >
        <h2 className="text-2xl font-medium text-zinc-900 mb-6 text-center">
          Log In
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent text-zinc-900 px-4 py-2.5 rounded-lg mb-4 border border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-transparent text-zinc-900 px-4 py-2.5 rounded-lg mb-6 border border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="bg-red-50 border border-red-100 p-3 rounded-lg mb-6">
            <div className="flex items-start gap-2 text-red-600 text-sm">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition mb-6 text-sm">
          Login
        </button>

        <p className="text-zinc-500 text-sm text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline transition-all"
          >
            Create
          </Link>
        </p>
      </form>
    </div>
  );
};
