import { useEffect, useState } from "react";
import api from "../api/api";
import { Plus, CheckCircle2, ListFilter } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
}
interface WorkoutSet {
  id: string;
  exerciseName: string;
  weight: number;
  reps: number;
}
interface Workout {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

export const Workouts = () => {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSet, setNewSet] = useState({
    exerciseId: "",
    weight: "",
    reps: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workoutRes, exRes] = await Promise.all([
          api.get("/workouts/active"),
          api.get("/exercises"),
        ]);
        setActiveWorkout(workoutRes.data);
        setExercises(exRes.data);
      } catch (e) {
        console.log("No active workout: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const startWorkout = async () => {
    const res = await api.post("/workouts", {
      name: `Session ${new Date().toLocaleDateString()}`,
    });
    setActiveWorkout(res.data);
  };

  const addSet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWorkout) return;
    const res = await api.post(`/workouts/${activeWorkout.id}/sets`, {
      ...newSet,
      weight: parseFloat(newSet.weight),
      reps: parseInt(newSet.reps),
    });
    setActiveWorkout({
      ...activeWorkout,
      sets: [...activeWorkout.sets, res.data],
    });
    setNewSet({ ...newSet, weight: "", reps: "" });
  };

  const finishWorkout = async () => {
    await api.patch("/workouts/finish");
    setActiveWorkout(null);
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      {!activeWorkout ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Plus size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Ready for your next session?
          </h2>
          <p className="text-slate-500 mb-8">
            Start a new workout to track your sets and reps.
          </p>
          <button
            onClick={startWorkout}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
          >
            Start New Workout
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900">
              {activeWorkout.name}
            </h2>
            <button
              onClick={finishWorkout}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-700 transition shadow-md shadow-emerald-100"
            >
              <CheckCircle2 size={18} /> Finish
            </button>
          </div>

          <form
            onSubmit={addSet}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-4 items-end"
          >
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">
                Exercise
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={newSet.exerciseId}
                onChange={(e) =>
                  setNewSet({ ...newSet, exerciseId: e.target.value })
                }
                required
              >
                <option value="">Select exercise...</option>
                {exercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">
                Kg
              </label>
              <input
                type="number"
                step="0.5"
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={newSet.weight}
                onChange={(e) =>
                  setNewSet({ ...newSet, weight: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">
                Reps
              </label>
              <input
                type="number"
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={newSet.reps}
                onChange={(e) => setNewSet({ ...newSet, reps: e.target.value })}
                required
              />
            </div>
            <button className="sm:col-span-4 bg-slate-900 text-white p-3 rounded-xl font-bold hover:bg-slate-800 transition">
              Add Set
            </button>
          </form>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2 text-slate-600 font-bold text-sm">
              <ListFilter size={16} /> Current Sets
            </div>
            <div className="divide-y divide-slate-100">
              {activeWorkout.sets.length === 0 ? (
                <div className="p-8 text-center text-slate-400 italic">
                  No sets added yet
                </div>
              ) : (
                activeWorkout.sets.map((set) => (
                  <div
                    key={set.id}
                    className="p-4 flex justify-between items-center hover:bg-slate-50 transition"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {set.exerciseName}
                      </div>
                      <div className="text-sm text-slate-500">
                        {set.weight} kg x {set.reps} reps
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
