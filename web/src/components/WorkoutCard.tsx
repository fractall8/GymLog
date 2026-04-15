import { Link } from "react-router-dom";
import { Calendar, Clock, ChevronRight, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Workout } from "@/types";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const calculateDuration = (start: string, end: string | null) => {
    if (!end) return "In Progress";
    const mins = Math.floor(
      (new Date(end).getTime() - new Date(start).getTime()) / 60000,
    );
    return `${mins} min`;
  };

  const exerciseNames = Array.from(
    new Set(workout.sets.map((s) => s.exerciseName)),
  );

  return (
    <Link
      to={`/workouts/${workout.id}`}
      className="block bg-white p-5 rounded-xl border border-zinc-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-zinc-900 mb-1.5 group-hover:text-blue-600 transition-colors">
            {workout.name}
          </h3>
          <div className="flex gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} /> {formatDate(workout.startedAt)}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />{" "}
              {calculateDuration(workout.startedAt, workout.finishedAt || null)}
            </div>
          </div>
        </div>
        <div className="text-zinc-300 group-hover:text-blue-500 transition-colors group-hover:translate-x-1">
          <ChevronRight size={20} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {exerciseNames.map((name, i) => (
          <Badge key={i} variant="secondary">
            <Dumbbell size={12} /> {name}
          </Badge>
        ))}
        {workout.sets.length === 0 && (
          <span className="text-xs text-zinc-400 italic">
            No exercises logged
          </span>
        )}
      </div>
    </Link>
  );
};
