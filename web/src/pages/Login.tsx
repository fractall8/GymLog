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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-slate-800 text-white p-3 rounded-lg mb-4 border border-slate-700 focus:border-indigo-500 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-slate-800 text-white p-3 rounded-lg mb-6 border border-slate-700 focus:border-indigo-500 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition">
          Login
        </button>
        <p className="text-slate-400 text-sm mt-4 text-center">
          Don't have an account?
          <Link to="/register" className="text-indigo-400 underline">
            Create
          </Link>
        </p>
      </form>
    </div>
  );
};
