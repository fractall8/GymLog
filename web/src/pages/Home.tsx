import { Link } from "react-router-dom";
import { Dumbbell, ArrowRight } from "lucide-react";

export const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-200 mb-8">
          <Dumbbell className="text-white" size={48} />
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Gym<span className="text-indigo-600">Log</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 mb-4 font-medium">
          Elevate your training with precise tracking.
        </p>

        <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto leading-relaxed">
          The most intuitive way to log your workouts, monitor your strength
          gains, and reach your fitness goals faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            className="group w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            to="/register"
          >
            Get Started
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center"
            to="/login"
          >
            Log In
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Track Sets</h3>
            <p className="text-slate-500 text-sm">
              Log weights and reps for every exercise in seconds.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">View History</h3>
            <p className="text-slate-500 text-sm">
              Analyze your previous workouts and stay consistent.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Progress Stats</h3>
            <p className="text-slate-500 text-sm">
              Visualize your growth with detailed charts and metrics.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
