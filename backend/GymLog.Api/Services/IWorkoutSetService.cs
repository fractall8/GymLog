using GymLog.Api.Models;

namespace GymLog.Api.Services;

public interface IWorkoutSetService
{
    Task<WorkoutSetModel?> AddSetAsync(Guid userId, Guid workoutId, CreateSetModel model);

    Task DeleteSetAsync(Guid setId, Guid userId);
}