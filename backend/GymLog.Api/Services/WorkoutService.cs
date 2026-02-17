using GymLog.Api.Entities;
using GymLog.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GymLog.Api.Services;

public class WorkoutService(GymLogDbContext context) : IWorkoutService
{
    public async Task<WorkoutModel?> StartWorkoutAsync(CreateWorkoutModel model, Guid userId)
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
                    CreatedAt = s.CreatedAt
                }).OrderBy(s => s.CreatedAt).ToList()
            })
            .FirstOrDefaultAsync();

        return workout;
    }
    
    
    public async Task FinishWorkoutAsync(Guid userId)
    {
        var workout = await context.Workouts
            .FirstOrDefaultAsync(w => w.UserId == userId && w.FinishedAt == null);

        if (workout == null)
        {
            return;
        }
        
        workout.FinishedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();
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
                Description = w.Description,
                Sets = w.WorkoutSets.Select(s => new WorkoutSetModel
                {
                    Id = s.Id,
                    ExerciseId = s.ExerciseId,
                    ExerciseName = s.Exercise.Name,
                    Weight = s.Weight,
                    Reps = s.Reps,
                    CreatedAt = s.CreatedAt
                }).OrderBy(s => s.CreatedAt).ToList()
            })
            .OrderByDescending(w => w.StartedAt)
            .ToListAsync();

        return workouts;
    } 
}