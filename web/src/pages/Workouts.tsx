import { useEffect, useState } from "react";
import api from "@/api/api";
import { Plus, Check, Play, Settings2 } from "lucide-react";
import type { Workout, Exercise, SetType, WorkoutSet } from "@/types";
import { Button } from "@/components/ui";
import { SetRow } from "@/components";

type GroupedSets = Record<string, { name: string; sets: WorkoutSet[] }>;

export const Workouts = () => {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActiveWorkout();
  }, []);

  const loadActiveWorkout = async () => {
    try {
      const res = await api.get("/workouts/active");
      setActiveWorkout(res.data);
    } catch (e) {
      console.log("No active workout found", e);
    } finally {
      setLoading(false);
    }
  };

  const startWorkout = async () => {
    try {
      const res = await api.post("/workouts", {
        name: `Session ${new Date().toLocaleDateString()}`,
      });
      setActiveWorkout(res.data);
    } catch (e) {
      alert("Failed to start workout");
      console.log("Failed to start workout", e);
    }
  };

  const cancelWorkout = async () => {
    if (
      !activeWorkout ||
      !window.confirm("Cancel workout? All current progress will be lost.")
    )
      return;
    try {
      await api.delete(`/workouts/${activeWorkout.id}`);
      setActiveWorkout(null);
    } catch (e) {
      alert("Failed to cancel workout");
      console.log("Failed to cancel workout", e);
    }
  };

  const finishWorkout = async () => {
    try {
      await api.patch("/workouts/finish");
      setActiveWorkout(null);
    } catch (e) {
      alert("Failed to finish workout");
      console.log("Failed to finish workout", e);
    }
  };

  const addSet = async (exerciseId: string) => {
    if (!activeWorkout) return;
    try {
      const res = await api.post(`/workouts/${activeWorkout.id}/sets`, {
        exerciseId,
        weight: 0,
        reps: 0,
        type: "Normal",
      });
      setActiveWorkout({
        ...activeWorkout,
        sets: [...activeWorkout.sets, res.data],
      });
    } catch (e) {
      alert("Failed to add set");
      console.log("Failed to add set", e);
    }
  };

  const deleteSet = async (setId: string) => {
    if (!activeWorkout) return;
    try {
      await api.delete(`/workouts/${activeWorkout.id}/sets/${setId}`);
      setActiveWorkout({
        ...activeWorkout,
        sets: activeWorkout.sets.filter((s) => s.id !== setId),
      });
    } catch (e) {
      alert("Failed to delete set");
      console.log("Failed to delete set", e);
    }
  };

  const updateSetData = async (
    setId: string,
    weight: number,
    reps: number,
    type: SetType,
  ) => {
    if (!activeWorkout) return;
    try {
      await api.put(`/workouts/${activeWorkout.id}/sets/${setId}`, {
        weight,
        reps,
        type,
      });
      setActiveWorkout({
        ...activeWorkout,
        sets: activeWorkout.sets.map((s) =>
          s.id === setId ? { ...s, weight, reps, type } : s,
        ),
      });
    } catch (e) {
      console.log("Failed to update set: ", e);
    }
  };

  const openExerciseSelector = async () => {
    try {
      const res = await api.get("/exercises");
      setExercises(res.data);
      setShowExerciseSelector(true);
    } catch (e) {
      alert("Failed to load exercises");
      console.log("Failed to load exercises", e);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20 text-zinc-400">Loading...</div>
    );

  if (!activeWorkout)
    return (
      <div className="max-w-md mx-auto text-center py-16 bg-white border border-zinc-200 rounded-xl shadow-sm">
        <div className="w-12 h-12 bg-zinc-50 text-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-100">
          <Play size={20} className="ml-1" />
        </div>
        <h2 className="text-xl font-medium text-zinc-900 mb-2">
          Ready to train?
        </h2>
        <p className="text-zinc-500 mb-6 text-sm">
          Start a blank session and track your progress.
        </p>
        <Button onClick={startWorkout} size="lg">
          Start Workout
        </Button>
      </div>
    );

  const groupedSets = activeWorkout.sets.reduce<GroupedSets>((acc, set) => {
    if (!acc[set.exerciseId])
      acc[set.exerciseId] = { name: set.exerciseName, sets: [] };
    acc[set.exerciseId].sets.push(set);
    return acc;
  }, {});

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-5 border border-zinc-200 rounded-xl shadow-sm">
        <div>
          <h1 className="text-xl font-medium text-zinc-900">
            {activeWorkout.name}
          </h1>
          <p className="text-sm text-zinc-500">In progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={cancelWorkout}>
            Cancel
          </Button>
          <Button variant="primary" onClick={finishWorkout}>
            <Check size={16} /> Finish
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedSets).map(([exId, data]) => (
          <div
            key={exId}
            className="bg-white border border-zinc-200 rounded-xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
              <h3 className="font-medium text-zinc-800 text-sm">{data.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
              >
                <Settings2 size={14} />
              </Button>
            </div>

            <div className="px-4 py-2">
              {data.sets.map((set, index: number) => (
                <SetRow
                  key={set.id}
                  index={index}
                  set={set}
                  onUpdate={updateSetData}
                  onDelete={deleteSet}
                />
              ))}

              <button
                onClick={() => addSet(exId)}
                className="w-full mt-2 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-md transition flex items-center justify-center gap-1.5"
              >
                <Plus size={14} /> Add Set
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        className="w-full py-3 border border-blue-100 border-dashed"
        onClick={openExerciseSelector}
      >
        <Plus size={18} /> Add Exercise
      </Button>

      {showExerciseSelector && (
        <div className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-sm rounded-xl p-5 shadow-lg">
            <h3 className="text-lg font-medium text-zinc-900 mb-4">
              Select Exercise
            </h3>
            <div className="max-h-64 overflow-y-auto space-y-1 mb-4">
              {exercises.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    addSet(ex.id);
                    setShowExerciseSelector(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-700 hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  {ex.name}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowExerciseSelector(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
