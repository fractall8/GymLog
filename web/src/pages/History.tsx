import { useEffect, useState } from "react";
import api from "../api/api";
import { Calendar, Clock, ChevronRight, Dumbbell } from "lucide-react";

interface WorkoutSet {
  id: string;
  exerciseName: string;
  weight: number;
  reps: number;
}
interface Workout {
  id: string;
  name: string;
  startedAt: string;
  finishedAt: string | null;
  sets: WorkoutSet[];
}

export const History = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/workouts")
      .then((res) => setWorkouts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  const calculateDuration = (start: string, end: string | null) => {
    if (!end) return "In Progress";
    const durationMs = new Date(end).getTime() - new Date(start).getTime();
    const mins = Math.floor(durationMs / 60000);
    return `${mins} min`;
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Workout History
        </h1>
        <p className="text-slate-500">
          Track your consistency and review past performances.
        </p>
      </header>

      <div className="space-y-4">
        {workouts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
            <p className="text-slate-500">
              No workouts recorded yet. Time to hit the gym!
            </p>
          </div>
        ) : (
          workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:cursor-pointer hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {workout.name}
                  </h3>
                  <div className="flex gap-4 text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} /> {formatDate(workout.startedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />{" "}
                      {calculateDuration(workout.startedAt, workout.finishedAt)}
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                  <ChevronRight size={20} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {Array.from(
                  new Set(workout.sets.map((s) => s.exerciseName)),
                ).map((name, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold"
                  >
                    <Dumbbell size={12} /> {name}
                  </span>
                ))}
                {workout.sets.length === 0 && (
                  <span className="text-xs text-slate-400 italic">
                    No exercises logged
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
