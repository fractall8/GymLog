using GymLog.Api.Models;

namespace GymLog.Api.Services;

public interface IWorkoutService
{
    Task<WorkoutModel?> StartWorkoutAsync(CreateWorkoutModel model, Guid userId);
    
    Task<WorkoutModel?> GetActiveWorkoutAsync(Guid userId);
    
    Task<bool> UpdateWorkoutAsync(Guid userId, Guid workoutId, UpdateWorkoutModel model);
    
    Task<bool> FinishWorkoutAsync(Guid userId);
    
    Task<IEnumerable<WorkoutModel>> GetWorkoutsAsync(Guid userId);
}