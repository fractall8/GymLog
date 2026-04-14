using Application.Interfaces;
using Domain.Entities;
using Application.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class ExerciseService(GymLogDbContext context) : IExerciseService
{
    public async Task<IEnumerable<ExerciseModel>> GetAllAsync(Guid? userId)
    {
        var exercise = await context.Exercises
            .Where(e => e.UserId == null || e.UserId == userId)
            .Select(e => new ExerciseModel
            {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                MediaUrl = e.MediaUrl,
                UserId = e.UserId
            })
            .AsNoTracking()
            .ToListAsync();
        
        return exercise;
    }

    public async Task<ExerciseModel?> GetByIdAsync(Guid? userId, Guid exerciseId)
    {
        var exercise = await context.Exercises
            .FindAsync(exerciseId);

        if (exercise == null || (exercise.UserId != null && exercise.UserId == userId))
        {
            return null;
        }
        
        return new ExerciseModel
        {
            Id =  exercise.Id,
            UserId = exercise.UserId,
            Name = exercise.Name,
            Description = exercise.Description,
            MediaUrl = exercise.MediaUrl
        };
    }
    
    public async Task<ExerciseModel> CreateAsync(Guid userId, CreateExerciseModel model)
    {
        var exercise = new Exercise
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Name = model.Name,
            Description = model.Description,
            MediaUrl = model.MediaUrl
        };
        
        await context.Exercises.AddAsync(exercise);
        await context.SaveChangesAsync();

        return new ExerciseModel
        {
            Id = exercise.Id,
            UserId = exercise.UserId,
            Name = exercise.Name,
            Description = exercise.Description,
            MediaUrl = exercise.MediaUrl
        };
    }
    
    public async Task UpdateAsync(Guid userId, Guid exerciseId, UpdateExerciseModel model)
    {
        var exercise = await context.Exercises
            .FirstOrDefaultAsync(e => e.Id == exerciseId && e.UserId == userId);

        if (exercise == null)
        {
            return;
        }
        
        exercise.Name = model.Name;
        exercise.Description = model.Description;
        exercise.MediaUrl = model.MediaUrl;
        
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid userId, Guid exerciseId)
    {
        var exercise = await context.Exercises
            .FirstOrDefaultAsync(e => e.Id == exerciseId && e.UserId == userId);

        if (exercise == null)
        {
            return;
        }
        
        context.Exercises.Remove(exercise);
        await context.SaveChangesAsync();
    }
}