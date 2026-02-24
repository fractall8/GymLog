import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/api";
import { ArrowLeft, Dumbbell, Info } from "lucide-react";
import type { Exercise } from "@/types";

export const ExerciseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/exercises/${id}`)
      .then((res) => setExercise(res.data))
      .catch(() => navigate("/exercises"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (!exercise) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => navigate("/exercises")}
        className="flex items-center gap-2 text-slate-500 hover:cursor-pointer hover:text-indigo-600 font-bold transition-colors mb-4"
      >
        <ArrowLeft size={20} /> Back to Library
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 bg-indigo-600 text-white flex items-center gap-6">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
            <Dumbbell size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-black">{exercise.name}</h1>
            <p className="text-indigo-100 font-medium">
              Exercise Guide & History
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6 p-8">
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-3">
              <Info size={20} className="text-indigo-600" />
              Description
            </h3>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
              {exercise.description ||
                "No description available for this exercise yet."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
