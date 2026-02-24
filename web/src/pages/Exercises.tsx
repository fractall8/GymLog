import { useEffect, useState } from "react";
import api from "../api/api";
import { Search, Plus, Dumbbell, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { ValidationApiErrorResponse } from "@/types/responses";
import type { AxiosError } from "axios";

interface Exercise {
  id: string;
  name: string;
  description: string;
  userId: string | null;
}

export const Exercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newExercise, setNewExercise] = useState({ name: "", description: "" });
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string[];
  } | null>(null);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const res = await api.get("/exercises");
      setExercises(res.data);
    } catch (e) {
      console.error("Failed to fetch exercises: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors(null);

    try {
      await api.post("/exercises", newExercise);
      setIsModalOpen(false);
      setNewExercise({ name: "", description: "" });
      fetchExercises();
    } catch (e) {
      const axiosError = e as AxiosError<ValidationApiErrorResponse>;

      if (
        axiosError.response?.status === 400 &&
        axiosError.response.data?.errors
      ) {
        setValidationErrors(axiosError.response.data.errors);
      } else {
        console.log("Failed to create exercise: ", e);
      }
    }
  };

  const filteredExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Exercises</h1>
          <p className="text-slate-500 font-medium">
            Explore standard moves or create your own.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center gap-2"
        >
          <Plus size={20} /> Add Custom
        </button>
      </header>

      <div className="relative mb-8">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search exercises..."
          className="w-full bg-white border border-slate-200 pl-12 pr-4 py-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((ex) => (
          <Link
            key={ex.id}
            to={`/exercises/${ex.id}`}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 rounded-2xl ${ex.userId ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"}`}
              >
                <Dumbbell size={24} />
              </div>
              {ex.userId && (
                <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">
                  Custom
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {ex.name}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
              {ex.description || "No description provided."}
            </p>
          </Link>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">New Exercise</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateExercise} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">
                  Exercise Name
                </label>
                <input
                  autoFocus
                  required
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  placeholder="e.g., Bench Press"
                  value={newExercise.name}
                  onChange={(e) =>
                    setNewExercise({ ...newExercise, name: e.target.value })
                  }
                />
                {validationErrors?.Name && (
                  <p className="text-red-500 text-xs font-bold mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1">
                    {validationErrors.Name[0]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">
                  Description (Optional)
                </label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition h-32 resize-none"
                  placeholder="How to perform this exercise..."
                  value={newExercise.description}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      description: e.target.value,
                    })
                  }
                />
                {validationErrors?.Description && (
                  <p className="text-red-500 text-xs font-bold mt-1.5 ml-1">
                    {validationErrors.Description[0]}
                  </p>
                )}
              </div>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 mt-4">
                <Check size={20} /> Create Exercise
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
