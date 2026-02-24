export type SetType = "Warmup" | "Normal" | "Failure";

export interface WorkoutSet {
    id: string;
    exerciseId: string;
    exerciseName: string;
    weight: number;
    reps: number;
    type: SetType;
}