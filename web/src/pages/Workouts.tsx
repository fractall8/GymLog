import { useEffect, useState } from "react";
import api from "../api/api";
import { Plus, CheckCircle2, Trash2, Flame, Thermometer, Play, XCircle, Pencil, Check } from "lucide-react";

type SetType = 'Warmup' | 'Normal' | 'Failure';

interface WorkoutSet {
  id: string;
  exerciseId: string;
  exerciseName: string;
  weight: number;
  reps: number;
  type: SetType;
}

interface Workout {
  id: string;
  name: string;
  description?: string;
  sets: WorkoutSet[];
}

export const Workouts = () => {
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [w, e] = await Promise.all([
        api.get("/workouts/active"),
        api.get("/exercises")
      ]);
      setActiveWorkout(w.data);
      setExercises(e.data);
      if (w.data) {
        setEditedName(w.data.name);
        setEditedDescription(w.data.description || "");
      }
    } catch (e) {
      console.log("No active workout found");
    } finally {
      setLoading(false);
    }
  };

  const startWorkout = async () => {
    try {
      const res = await api.post("/workouts", { 
        name: `Session ${new Date().toLocaleDateString()}` 
      });
      setActiveWorkout(res.data);
      setEditedName(res.data.name);
      setEditedDescription("");
    } catch (e) {
      alert("Failed to start workout");
    }
  };

  const cancelWorkout = async () => {
    if (!activeWorkout || !window.confirm("Cancel workout? All current progress will be lost.")) return;
    try {
      await api.delete(`/workouts/${activeWorkout.id}`);
      setActiveWorkout(null);
    } catch (e) {
      alert("Failed to cancel workout");
    }
  };

  const finishWorkout = async () => {
    try {
      await api.patch("/workouts/finish");
      setActiveWorkout(null);
    } catch (e) {
      alert("Failed to finish workout");
    }
  };

  const addSet = async (exerciseId: string) => {
    if (!activeWorkout) return;
    try {
      const res = await api.post(`/workouts/${activeWorkout.id}/sets`, {
        exerciseId,
        weight: 0,
        reps: 0,
        type: 'Normal'
      });
      setActiveWorkout({
        ...activeWorkout,
        sets: [...activeWorkout.sets, res.data]
      });
    } catch (e) {
      alert("Failed to add set");
    }
  };

  const deleteSet = async (setId: string) => {
    if (!activeWorkout) return;
    try {
      await api.delete(`/workouts/${activeWorkout.id}/sets/${setId}`);
      setActiveWorkout({
        ...activeWorkout,
        sets: activeWorkout.sets.filter(s => s.id !== setId)
      });
    } catch (e) {
      alert("Failed to delete set");
    }
  };

  const updateSetData = async (setId: string, weight: number, reps: number, type: SetType) => {
    if (!activeWorkout) return;
    try {
      await api.put(`/workouts/${activeWorkout.id}/sets/${setId}`, { weight, reps, type });
      setActiveWorkout({
        ...activeWorkout,
        sets: activeWorkout.sets.map(s => 
          s.id === setId ? { ...s, weight, reps, type } : s
        )
      });
    } catch (e) {
      console.error("Failed to update set");
    }
  };

  const toggleSetType = (set: WorkoutSet) => {
    const types: SetType[] = ['Warmup', 'Normal', 'Failure'];
    const currentIndex = types.indexOf(set.type);
    const nextType = types[(currentIndex + 1) % types.length];
    updateSetData(set.id, set.weight, set.reps, nextType);
  };

  const handleUpdateWorkoutInfo = async () => {
    if (!activeWorkout) return;
    try {
      await api.put(`/workouts/${activeWorkout.id}`, {
        name: editedName || activeWorkout.name,
        description: editedDescription
      });
      setActiveWorkout({ ...activeWorkout, name: editedName, description: editedDescription });
      setIsEditing(false);
    } catch (e) {
      alert("Failed to update workout info");
    }
  };

  const groupedSets = activeWorkout?.sets.reduce((acc: Record<string, {name: string, sets: WorkoutSet[]}>, set: WorkoutSet) => {
    if (!acc[set.exerciseId]) acc[set.exerciseId] = { name: set.exerciseName, sets: [] };
    acc[set.exerciseId].sets.push(set);
    return acc;
  }, {});

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!activeWorkout) return (
    <div className="max-w-xl mx-auto text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Play size={32} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready for a session?</h2>
      <p className="text-slate-500 mb-8">Start tracking your workout to see your progress.</p>
      <button 
        onClick={startWorkout}
        className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
      >
        Start New Workout
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  autoFocus
                  className="text-2xl font-bold text-slate-900 w-full outline-none border-b-2 border-indigo-600 pb-1"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Workout Name"
                />
                <textarea
                  className="text-slate-500 w-full outline-none border-b border-slate-200 py-1 resize-none h-20 text-sm"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Add a description..."
                />
                <button 
                  onClick={handleUpdateWorkoutInfo}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-indigo-700 transition"
                >
                  <Check size={16} /> Save Changes
                </button>
              </div>
            ) : (
              <div className="group">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-slate-900">{activeWorkout.name}</h2>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
                {activeWorkout.description && <p className="text-slate-500 mt-1 text-sm">{activeWorkout.description}</p>}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={cancelWorkout} className="p-2 text-slate-400 hover:text-red-600 transition" title="Cancel">
              <XCircle size={24} />
            </button>
            <button 
              onClick={finishWorkout}
              className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-700 transition shadow-md shadow-emerald-100 flex items-center gap-2"
            >
              <CheckCircle2 size={18} /> Finish
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedSets || {}).map(([exId, data]) => (
          <div key={exId} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
              {data.name}
            </div>
            <div className="p-4 space-y-2">
              {data.sets.map((set, index) => (
                <div key={set.id} className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl">
                  <span className="w-8 text-xs font-black text-slate-400 text-center">#{index + 1}</span>
                  
                  <button 
                    onClick={() => toggleSetType(set)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition bg-transparent"
                    title="Toggle Set Type"
                  >
                    {set.type === 'Warmup' && <Thermometer size={18} className="text-blue-500" />}
                    {set.type === 'Normal' && <Play size={18} className="text-slate-400" />}
                    {set.type === 'Failure' && <Flame size={18} className="text-orange-500" />}
                  </button>

                  <div className="flex-1 flex gap-2">
                    <div className="flex-1">
                      <input 
                        type="number" 
                        step="0.5"
                        placeholder="kg"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-center font-bold outline-none focus:border-indigo-500 transition"
                        defaultValue={set.weight}
                        onBlur={(e) => updateSetData(set.id, parseFloat(e.target.value) || 0, set.reps, set.type)}
                      />
                    </div>
                    <div className="flex-1">
                      <input 
                        type="number" 
                        placeholder="reps"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-center font-bold outline-none focus:border-indigo-500 transition"
                        defaultValue={set.reps}
                        onBlur={(e) => updateSetData(set.id, set.weight, parseInt(e.target.value) || 0, set.type)}
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => deleteSet(set.id)} 
                    className="p-2 text-slate-300 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              
              <button 
                onClick={() => addSet(exId)} 
                className="w-full mt-2 py-3 rounded-xl border-2 border-dashed border-slate-100 text-slate-400 text-sm font-bold hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Set
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setShowExerciseSelector(true)}
        className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:border-indigo-300 hover:text-indigo-600 transition flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Add Exercise
      </button>

      {showExerciseSelector && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Select Exercise</h3>
            <div className="max-h-80 overflow-y-auto space-y-1 mb-6 pr-2">
              {exercises.map(ex => (
                <button 
                  key={ex.id}
                  onClick={() => {
                    addSet(ex.id);
                    setShowExerciseSelector(false);
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-indigo-50 font-bold text-slate-700 transition"
                >
                  {ex.name}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowExerciseSelector(false)} 
              className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};