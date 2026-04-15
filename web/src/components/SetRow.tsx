import { Trash2 } from "lucide-react";
import type { WorkoutSet, SetType } from "@/types";

interface SetRowProps {
  index: number;
  set: WorkoutSet;
  onUpdate: (id: string, weight: number, reps: number, type: SetType) => void;
  onDelete: (id: string) => void;
}

export const SetRow = ({ index, set, onUpdate, onDelete }: SetRowProps) => {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-zinc-100 last:border-0">
      <span className="w-6 text-xs font-semibold text-zinc-400 text-center">
        {index + 1}
      </span>

      <select
        value={set.type}
        onChange={(e) =>
          onUpdate(set.id, set.weight, set.reps, e.target.value as SetType)
        }
        className="bg-transparent border border-zinc-200 rounded-md px-2 py-1 text-sm text-zinc-700 outline-none focus:border-blue-400 transition"
      >
        <option value="Warmup">Warmup</option>
        <option value="Normal">Normal</option>
        <option value="Failure">Failure</option>
      </select>

      <div className="flex-1 flex justify-end items-center gap-4">
        <div className="flex items-center gap-1">
          <input
            type="number"
            step="0.5"
            className="w-16 bg-transparent border border-zinc-200 rounded-md p-1.5 text-center outline-none focus:border-blue-400 transition text-sm"
            defaultValue={set.weight || ""}
            placeholder="0"
            onBlur={(e) =>
              onUpdate(
                set.id,
                parseFloat(e.target.value) || 0,
                set.reps,
                set.type,
              )
            }
          />
          <span className="text-xs text-zinc-400">kg</span>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="number"
            className="w-16 bg-transparent border border-zinc-200 rounded-md p-1.5 text-center outline-none focus:border-blue-400 transition text-sm"
            defaultValue={set.reps || ""}
            placeholder="0"
            onBlur={(e) =>
              onUpdate(
                set.id,
                set.weight,
                parseInt(e.target.value) || 0,
                set.type,
              )
            }
          />
          <span className="text-xs text-zinc-400">reps</span>
        </div>

        <button
          onClick={() => onDelete(set.id)}
          className="p-1.5 text-zinc-300 hover:text-red-500 transition rounded-md hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
