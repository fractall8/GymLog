import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/api";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Thermometer,
  Play,
  Flame,
  AlignLeft,
} from "lucide-react";
import type { Workout, WorkoutSet } from "@/types";
import { Badge, Button } from "@/components/ui";

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
      month: "short",
      year: "numeric",
    });

  const calculateDuration = (start: string, end?: string) => {
    if (!end) return "In progress";
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return `${Math.floor(diff / 60000)} min`;
  };

  if (loading)
    return (
      <div className="p-10 text-center text-zinc-400">Loading workout...</div>
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
    <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      <Button
        variant="ghost"
        onClick={() => navigate("/history")}
        className="text-zinc-500 hover:text-zinc-900 -ml-4"
      >
        <ArrowLeft size={16} /> Back to History
      </Button>

      {workout && (
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-zinc-50/50 border-b border-zinc-100">
            <h1 className="text-2xl font-medium text-zinc-900 mb-3">
              {workout.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {formatDate(workout.startedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />{" "}
                {calculateDuration(workout.startedAt, workout.finishedAt)}
              </span>
            </div>

            {workout.description && (
              <div className="mt-4 p-3 bg-white rounded-lg border border-zinc-200 text-zinc-600 text-sm flex gap-2">
                <AlignLeft
                  size={16}
                  className="shrink-0 text-zinc-400 mt-0.5"
                />
                {workout.description}
              </div>
            )}
          </div>

          {/* Exercises */}
          <div className="p-6 space-y-6">
            {Object.entries(groupedSets || {}).map(
              ([exId, data]: [
                string,
                { name: string; sets: WorkoutSet[] },
              ]) => (
                <div key={exId} className="space-y-3">
                  <h3 className="text-sm font-medium text-zinc-900 pb-2 border-b border-zinc-100">
                    {data.name}
                  </h3>

                  <div className="grid gap-1.5">
                    {data.sets.map((set: WorkoutSet, index: number) => (
                      <div
                        key={set.id}
                        className="flex items-center justify-between py-2 px-3 hover:bg-zinc-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-4 text-xs font-medium text-zinc-400">
                            {index + 1}
                          </span>

                          <div className="w-20">
                            {set.type === "Warmup" && (
                              <Badge variant="warmup">
                                <Thermometer size={12} /> Warmup
                              </Badge>
                            )}
                            {set.type === "Normal" && (
                              <Badge variant="default">
                                <Play size={12} /> Normal
                              </Badge>
                            )}
                            {set.type === "Failure" && (
                              <Badge variant="failure">
                                <Flame size={12} /> Failure
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-6 text-sm">
                          <div className="text-right w-16">
                            <span className="font-medium text-zinc-900">
                              {set.weight}
                            </span>
                            <span className="text-zinc-400 ml-1">kg</span>
                          </div>
                          <div className="text-right w-16">
                            <span className="font-medium text-zinc-900">
                              {set.reps}
                            </span>
                            <span className="text-zinc-400 ml-1">reps</span>
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
