import type { WorkoutSet } from "./workoutset";

export interface Workout {
    id: string;
    name: string;
    description?: string;
    startedAt: string,
    finishedAt?: string,
    sets: WorkoutSet[];
}