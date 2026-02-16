using GymLog.Api.Entities;
using GymLog.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GymLog.Api.Services;

public class ExerciseService(GymLogDbContext context) : IExerciseService
{
    public async Task<IEnumerable<ExerciseModel>> GetAllAsync(Guid? userId)
    {
        var exercies = await context.Exercises
            .Where(e => e.UserId == userId)
            .Select(e => MapToModel(e))
            .ToListAsync();
        
        return exercies;
    }

    public async Task<ExerciseModel?> GetByIdAsync(Guid id)
    {
        var exercise = await context.Exercises.FindAsync(id);
        return MapToModel(exercise);
    }
    
    public async Task CreateAsync(CreateExerciseModel model)
    {
        var exercise = new Exercise
        {
            Id = Guid.NewGuid(),
            UserId = Guid.NewGuid(), // temp
            Name = model.Name,
            Description = model.Description,
            MediaUrl = model.MediaUrl
        };
        
        await context.Exercises.AddAsync(exercise);
        await context.SaveChangesAsync();
    }
    
    public async Task UpdateAsync(UpdateExerciseModel model)
    {
        var exercise = await context.Exercises.FindAsync(model.Id);

        if (exercise == null)
        {
            return;
        }
        
        exercise.UserId = model.UserId;
        exercise.Name = model.Name;
        exercise.Description = model.Description;
        exercise.MediaUrl = model.MediaUrl;
        
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var exercise = await context.Exercises.FindAsync(id);

        if (exercise == null)
        {
            return;
        }
        
        context.Exercises.Remove(exercise);
        await context.SaveChangesAsync();
    }

    private ExerciseModel? MapToModel(Exercise? model)
    {
        if (model == null)
        {
            return null;
        }
        
        return new ExerciseModel
        {
            Id = model.Id,
            UserId = model.UserId,
            Name = model.Name,
            Description = model.Description,
            MediaUrl = model.MediaUrl
        };
    }
}