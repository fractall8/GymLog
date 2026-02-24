import { Link } from "react-router-dom";
import { SearchX, ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <SearchX size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">404</h1>
          <p className="text-slate-500 mb-8 font-medium">
            Oops! The page you're looking for has gone... and we can't find it.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition"
          >
            <ArrowLeft size={18} /> Back to Safety
          </Link>
        </div>
      </div>
    </div>
  );
};
