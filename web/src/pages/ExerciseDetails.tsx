import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/api";
import { ArrowLeft, Dumbbell, AlignLeft } from "lucide-react";
import type { Exercise } from "@/types";
import { Button } from "@/components/ui";

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
      <div className="flex justify-center py-20 text-zinc-400">Loading...</div>
    );
  if (!exercise) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      <Button
        variant="ghost"
        onClick={() => navigate("/exercises")}
        className="text-zinc-500 hover:text-zinc-900 -ml-4"
      >
        <ArrowLeft size={16} /> Back to Library
      </Button>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-start gap-4 bg-zinc-50/50">
          <div className="bg-white border border-zinc-200 p-3 rounded-xl text-zinc-600 shadow-sm">
            <Dumbbell size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-zinc-900">
              {exercise.name}
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Exercise Guide</p>
          </div>
        </div>

        <div className="p-6">
          <h3 className="flex items-center gap-2 text-sm font-medium text-zinc-900 mb-3">
            <AlignLeft size={16} className="text-zinc-400" />
            Description
          </h3>
          <div className="text-zinc-600 text-sm leading-relaxed bg-zinc-50/50 p-4 rounded-lg border border-zinc-100">
            {exercise.description ||
              "No description available for this exercise yet."}
          </div>
        </div>
      </div>
    </div>
  );
};
