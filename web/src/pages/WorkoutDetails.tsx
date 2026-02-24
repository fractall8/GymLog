import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/api";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Dumbbell,
  Thermometer,
  Play,
  Flame,
  AlignLeft,
} from "lucide-react";
import type { Workout, WorkoutSet } from "@/types";

type GroupedSets = Record<string, { name: string; sets: WorkoutSet[] }>;

export const WorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/workouts/${id}`)
      .then((res) => setWorkout(res.data))
      .catch(() => console.log("Failed to fetch workout"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const calculateDuration = (start: string, end?: string) => {
    if (!end) return "In progress";
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return `${Math.floor(diff / 60000)} min`;
  };

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-slate-400">
        Loading workout...
      </div>
    );

  const groupedSets = workout?.sets.reduce(
    (acc: GroupedSets, set: WorkoutSet) => {
      if (!acc[set.exerciseId]) {
        acc[set.exerciseId] = { name: set.exerciseName, sets: [] };
      }

      acc[set.exerciseId].sets.push(set);
      return acc;
    },
    {},
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <button
        onClick={() => navigate("/history")}
        className="flex items-center gap-2 text-slate-500 hover:cursor-pointer hover:text-indigo-600 font-bold transition-colors"
      >
        <ArrowLeft size={20} /> Back to History
      </button>

      {workout && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 bg-slate-50 border-b border-slate-100">
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              {workout.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={16} /> {formatDate(workout.startedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} />{" "}
                {calculateDuration(workout.startedAt, workout.finishedAt)}
              </span>
            </div>
            {workout.description && (
              <div className="mt-4 p-4 bg-white rounded-2xl border border-slate-200 text-slate-600 text-sm flex gap-2">
                <AlignLeft size={16} className="shrink-0 mt-0.5" />
                {workout.description}
              </div>
            )}
          </div>

          <div className="p-8 space-y-8">
            {Object.entries(groupedSets || {}).map(
              ([exId, data]: [
                string,
                { name: string; sets: WorkoutSet[] },
              ]) => (
                <div key={exId} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Dumbbell size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {data.name}
                    </h3>
                  </div>

                  <div className="grid gap-2">
                    {data.sets.map((set: WorkoutSet, index: number) => (
                      <div
                        key={set.id}
                        className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100"
                      >
                        <span className="w-6 text-xs font-black text-slate-300">
                          #{index + 1}
                        </span>

                        <div className="flex items-center gap-2 min-w-25">
                          {set.type === "Warmup" && (
                            <>
                              <Thermometer
                                size={14}
                                className="text-blue-500"
                              />{" "}
                              <span className="text-[10px] font-bold uppercase text-blue-500">
                                Warmup
                              </span>
                            </>
                          )}
                          {set.type === "Normal" && (
                            <>
                              <Play size={14} className="text-slate-400" />{" "}
                              <span className="text-[10px] font-bold uppercase text-slate-400">
                                Normal
                              </span>
                            </>
                          )}
                          {set.type === "Failure" && (
                            <>
                              <Flame size={14} className="text-orange-500" />{" "}
                              <span className="text-[10px] font-bold uppercase text-orange-500">
                                Failure
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex gap-4 ml-auto">
                          <div className="text-right">
                            <span className="text-lg font-black text-slate-900">
                              {set.weight}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                              kg
                            </span>
                          </div>
                          <div className="text-right min-w-15">
                            <span className="text-lg font-black text-slate-900">
                              {set.reps}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                              reps
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};
