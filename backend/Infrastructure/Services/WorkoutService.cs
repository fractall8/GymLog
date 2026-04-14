using Application.Interfaces;
using Domain.Entities;
using Application.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class WorkoutService(GymLogDbContext context) : IWorkoutService
{
    public async Task<WorkoutModel?> StartWorkoutAsync(Guid userId, CreateWorkoutModel model)
    {
        var hasActive = await context.Workouts.AnyAsync(w => w.UserId == userId && w.FinishedAt == null);

        if (hasActive)
        {
            return null;
        }

        var workout = new Workout
        {
            Id = Guid.CreateVersion7(),
            UserId = userId,
            Name = model.Name,
            Description = model.Description,
            StartedAt = DateTime.UtcNow,
            FinishedAt = null
        };

        context.Workouts.Add(workout);
        await context.SaveChangesAsync();
        return new WorkoutModel
        {
            Id = workout.Id,
            Name = workout.Name,
            StartedAt = workout.StartedAt,
            Description = workout.Description,
            FinishedAt = workout.FinishedAt,
        };
    }

    public async Task<WorkoutModel?> GetActiveWorkoutAsync(Guid userId)
    {
        var workout = await context.Workouts
            .Where(w => w.UserId == userId && w.FinishedAt == null)
            .Include(w => w.WorkoutSets)
            .ThenInclude(s => s.Exercise)
            .AsNoTracking()
            .Select(w => new WorkoutModel
            {
                Id = w.Id,
                Name = w.Name,
                StartedAt = w.StartedAt,
                Description = w.Description,
                Sets = w.WorkoutSets.Select(s => new WorkoutSetModel
                {
                    Id = s.Id,
                    ExerciseId = s.ExerciseId,
                    ExerciseName = s.Exercise.Name,
                    Weight = s.Weight,
                    Reps = s.Reps,
                    Type = s.Type,
                    CreatedAt = s.CreatedAt
                }).OrderBy(s => s.CreatedAt).ToList()
            })
            .FirstOrDefaultAsync();

        return workout;
    }

    public async Task<WorkoutModel?> GetWorkoutByIdAsync(Guid userId, Guid workoutId)
    {
        return await context.Workouts
            .Where(w => w.Id == workoutId && w.UserId == userId)
            .Include(w => w.WorkoutSets)
            .ThenInclude(s => s.Exercise)
            .AsNoTracking()
            .Select(w => new WorkoutModel
            {
                Id = w.Id,
                Name = w.Name,
                Description = w.Description,
                StartedAt = w.StartedAt,
                FinishedAt = w.FinishedAt,
                Sets = w.WorkoutSets.Select(s => new WorkoutSetModel
                {
                    Id = s.Id,
                    ExerciseId = s.ExerciseId,
                    ExerciseName = s.Exercise.Name,
                    Weight = s.Weight,
                    Reps = s.Reps,
                    Type = s.Type,
                    CreatedAt = s.CreatedAt
                }).OrderBy(s => s.CreatedAt).ToList()
            })
            .FirstOrDefaultAsync();
    }

    public async Task<bool> UpdateWorkoutAsync(Guid userId, Guid workoutId, UpdateWorkoutModel model)
    {
        var workout = await context.Workouts
            .FirstOrDefaultAsync(w => w.Id == workoutId && w.UserId == userId);

        if (workout == null)
        {
            return false;
        }
        
        workout.Name = model.Name;
        workout.Description = model.Description;
        
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> FinishWorkoutAsync(Guid userId)
    {
        var workout = await context.Workouts
            .FirstOrDefaultAsync(w => w.UserId == userId && w.FinishedAt == null);

        if (workout == null)
        {
            return false;
        }

        workout.FinishedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> CancelWorkoutAsync(Guid userId, Guid workoutId)
    {
        var workout = await context.Workouts
            .FirstOrDefaultAsync(w => w.Id == workoutId && w.UserId == userId);

        if (workout == null)
        {
            return false;
        }
        
        context.Workouts.Remove(workout);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<WorkoutModel>> GetWorkoutsAsync(Guid userId)
    {
        var workouts = await context.Workouts
            .Where(w => w.UserId == userId)
            .Include(w => w.WorkoutSets)
            .ThenInclude(s => s.Exercise)
            .AsNoTracking()
            .Select(w => new WorkoutModel
            {
                Id = w.Id,
                Name = w.Name,
                StartedAt = w.StartedAt,
                FinishedAt = w.FinishedAt,
                Description = w.Description,
                Sets = w.WorkoutSets.Select(s => new WorkoutSetModel
                {
                    Id = s.Id,
                    ExerciseId = s.ExerciseId,
                    ExerciseName = s.Exercise.Name,
                    Weight = s.Weight,
                    Reps = s.Reps,
                    Type = s.Type,
                    CreatedAt = s.CreatedAt
                }).OrderBy(s => s.CreatedAt).ToList()
            })
            .OrderByDescending(w => w.StartedAt)
            .ToListAsync();

        return workouts;
    }
}