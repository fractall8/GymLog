import { Link } from "react-router-dom";
import {
  Dumbbell,
  ArrowRight,
  Activity,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

export const Home = () => {
  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-2xl mb-8">
          <Dumbbell className="text-blue-600" size={40} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 tracking-tight">
          Gym<span className="text-blue-600">Log</span>
        </h1>

        <p className="text-xl md:text-2xl text-zinc-600 mb-4 font-medium">
          Elevate your training with precise tracking.
        </p>

        <p className="text-lg text-zinc-500 mb-10 max-w-lg mx-auto leading-relaxed">
          The most intuitive way to log your workouts, monitor your strength
          gains, and reach your fitness goals faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            className="group w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-xl font-medium text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            to="/register"
          >
            Get Started
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            className="w-full sm:w-auto bg-white text-zinc-700 border border-zinc-200 px-6 py-2 rounded-xl font-medium text-lg hover:bg-zinc-50 hover:border-zinc-300 transition-colors flex items-center justify-center"
            to="/login"
          >
            Log In
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-white rounded-xl border border-zinc-200">
            <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-lg flex items-center justify-center mb-4">
              <Activity size={20} />
            </div>
            <h3 className="font-medium text-zinc-900 mb-1.5">Track Sets</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Log weights and reps for every exercise in seconds.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-zinc-200">
            <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-lg flex items-center justify-center mb-4">
              <CalendarCheck size={20} />
            </div>
            <h3 className="font-medium text-zinc-900 mb-1.5">View History</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Analyze your previous workouts and stay consistent.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-zinc-200">
            <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-medium text-zinc-900 mb-1.5">Progress Stats</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Visualize your growth with detailed charts and metrics.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
