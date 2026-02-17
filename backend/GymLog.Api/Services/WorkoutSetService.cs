using GymLog.Api.Entities;
using GymLog.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GymLog.Api.Services;

public class WorkoutSetService(GymLogDbContext context): IWorkoutSetService
{
    public async Task<WorkoutSetModel?> AddSetAsync(Guid userId, Guid workoutId, CreateSetModel model)
    {
        var exerciseExists = await context.Exercises.AnyAsync(e => e.Id == model.ExerciseId);
        if (!exerciseExists)
        {
            return null; 
        }
        
        var workout = await context.Workouts
            .FirstOrDefaultAsync(w => w.Id == workoutId && w.UserId == userId && w.FinishedAt == null);

        if (workout == null)
        {
            return null;
        }

        var set = new WorkoutSet
        {
            Id = Guid.CreateVersion7(),
            WorkoutId = workoutId,
            ExerciseId = model.ExerciseId,
            Weight = model.Weight,
            Reps = model.Reps,
            CreatedAt = DateTime.UtcNow
        };

        context.Sets.Add(set);
        await context.SaveChangesAsync();
        
        var exerciseName = await context.Exercises
            .Where(e => e.Id == model.ExerciseId)
            .Select(e => e.Name)
            .FirstAsync();

        return new WorkoutSetModel
        {
            Id = set.Id,
            ExerciseId = set.ExerciseId,
            ExerciseName = exerciseName,
            Weight = set.Weight,
            Reps = set.Reps,
            CreatedAt = set.CreatedAt
        };
    }

    public async Task DeleteSetAsync(Guid setId, Guid userId)
    {
        var set = await context.Sets
            .FirstOrDefaultAsync(s => s.Id == setId && s.Workout.UserId == userId);

        if (set != null)
        {
            context.Sets.Remove(set);
            await context.SaveChangesAsync();
        }
    }
}