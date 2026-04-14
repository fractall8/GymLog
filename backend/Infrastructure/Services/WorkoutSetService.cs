using Application.Interfaces;
using Domain.Entities;
using Application.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

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
            Type = model.Type,
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
            Type = set.Type,
            CreatedAt = set.CreatedAt
        };
    }

    public async Task<bool> UpdateSetAsync(Guid userId, Guid setId, UpdateSetModel model)
    {
        var set = await context.Sets
            .Include(s => s.Workout)
            .FirstOrDefaultAsync(s => s.Id == setId && s.Workout.UserId == userId);

        if (set == null)
        {
            return false;
        }
        
        set.Weight = model.Weight;
        set.Reps = model.Reps;
        set.Type = model.Type;
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteSetAsync(Guid userId, Guid setId)
    {
        var set = await context.Sets
            .Include(s => s.Workout)
            .FirstOrDefaultAsync(s => s.Id == setId && s.Workout.UserId == userId);

        if (set == null)
        {
            return false;
        } 
        
        context.Sets.Remove(set);
        await context.SaveChangesAsync();
        return true;
    }
}