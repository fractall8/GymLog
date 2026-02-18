import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (ex) {
      console.log("Failed to login:", ex);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl border border-slate-200 w-full max-w-md shadow-xl shadow-slate-200/50"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-white text-slate-900 p-3 rounded-lg mb-4 border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-white text-slate-900 p-3 rounded-lg mb-6 border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition shadow-lg shadow-indigo-200">
          Login
        </button>
        <p className="text-slate-500 text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold underline"
          >
            Create
          </Link>
        </p>
      </form>
    </div>
  );
};
