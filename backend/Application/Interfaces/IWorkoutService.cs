using Application.Models;

namespace Application.Interfaces;

public interface IWorkoutService
{
    Task<WorkoutModel?> StartWorkoutAsync(Guid userId, CreateWorkoutModel model);
    
    Task<WorkoutModel?> GetActiveWorkoutAsync(Guid userId);
    
    Task<WorkoutModel?> GetWorkoutByIdAsync(Guid userId, Guid workoutId);
    
    Task<bool> UpdateWorkoutAsync(Guid userId, Guid workoutId, UpdateWorkoutModel model);
    
    Task<bool> FinishWorkoutAsync(Guid userId);
    
    Task<bool> CancelWorkoutAsync(Guid userId, Guid workoutId);
    
    Task<IEnumerable<WorkoutModel>> GetWorkoutsAsync(Guid userId);
}