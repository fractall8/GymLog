import { useEffect, useState } from "react";
import api from "@/api/api";
import { WorkoutCard } from "@/components";
import type { Workout } from "@/types";

export const History = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/workouts")
      .then((res) => setWorkouts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-zinc-400">Loading...</div>
    );

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <header className="mb-8">
        <h1 className="text-2xl font-medium text-zinc-900 mb-1">
          Workout History
        </h1>
        <p className="text-sm text-zinc-500">
          Track your consistency and review past performances.
        </p>
      </header>

      <div className="space-y-3">
        {workouts.length === 0 ? (
          <div className="bg-white p-10 rounded-xl border border-zinc-200 text-center shadow-sm">
            <p className="text-zinc-500 text-sm">
              No workouts recorded yet. Time to hit the gym!
            </p>
          </div>
        ) : (
          workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))
        )}
      </div>
    </div>
  );
};
