import { useEffect, useState } from "react";
import api from "@/api/api";
import { Search, Plus, Dumbbell, X } from "lucide-react";
import { Link } from "react-router-dom";
import type { ValidationApiErrorResponse } from "@/types/responses";
import type { ApiError } from "@/api/api";
import { Button, Badge } from "@/components/ui";

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
      const axiosError = e as ApiError<ValidationApiErrorResponse>;
      if (
        axiosError.response?.status === 400 &&
        axiosError.response.data?.errors
      ) {
        setValidationErrors(axiosError.response.data.errors);
      }
    }
  };

  const filteredExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading)
    return (
      <div className="flex justify-center py-20 text-zinc-400">Loading...</div>
    );

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-medium text-zinc-900">Exercises</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Explore standard moves or create your own.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Add Custom
        </Button>
      </header>

      <div className="relative mb-6">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search exercises..."
          className="w-full bg-white border border-zinc-200 pl-10 pr-4 py-2.5 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((ex) => (
          <Link
            key={ex.id}
            to={`/exercises/${ex.id}`}
            className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm hover:border-blue-300 transition-colors group flex flex-col"
          >
            <div className="flex justify-between items-start mb-3">
              <div
                className={`p-2 rounded-lg ${ex.userId ? "bg-blue-50 text-blue-600" : "bg-zinc-100 text-zinc-600"}`}
              >
                <Dumbbell size={18} />
              </div>
              {ex.userId && <Badge variant="secondary">Custom</Badge>}
            </div>
            <h3 className="text-base font-medium text-zinc-900 mb-1.5 group-hover:text-blue-600 transition-colors">
              {ex.name}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mt-auto">
              {ex.description || "No description provided."}
            </p>
          </Link>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <h2 className="text-lg font-medium text-zinc-900">
                New Exercise
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateExercise} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">
                  Exercise Name
                </label>
                <input
                  autoFocus
                  required
                  className="w-full bg-transparent border border-zinc-200 px-3 py-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm text-zinc-900"
                  placeholder="e.g., Bench Press"
                  value={newExercise.name}
                  onChange={(e) =>
                    setNewExercise({ ...newExercise, name: e.target.value })
                  }
                />
                {validationErrors?.Name && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {validationErrors.Name[0]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">
                  Description (Optional)
                </label>
                <textarea
                  className="w-full bg-transparent border border-zinc-200 px-3 py-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition h-24 resize-none text-sm text-zinc-900"
                  placeholder="How to perform this exercise..."
                  value={newExercise.description}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <Button type="submit" className="w-full mt-2">
                Create Exercise
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
