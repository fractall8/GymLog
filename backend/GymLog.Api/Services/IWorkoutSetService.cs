using GymLog.Api.Models;

namespace GymLog.Api.Services;

public interface IWorkoutSetService
{
    Task<WorkoutSetModel?> AddSetAsync(Guid userId, Guid workoutId, CreateSetModel model);
    
    Task<bool> UpdateSetAsync(Guid userId, Guid setId, UpdateSetModel model);

    Task DeleteSetAsync(Guid userId, Guid setId);
}