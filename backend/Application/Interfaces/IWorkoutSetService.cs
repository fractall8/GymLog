using Application.Models;

namespace Application.Interfaces;

public interface IWorkoutSetService
{
    Task<WorkoutSetModel?> AddSetAsync(Guid userId, Guid workoutId, CreateSetModel model);
    
    Task<bool> UpdateSetAsync(Guid userId, Guid setId, UpdateSetModel model);

    Task<bool> DeleteSetAsync(Guid userId, Guid setId);
}