using GymLog.Api.Models;

namespace GymLog.Api.Services;

public interface IExerciseService
{
    Task<IEnumerable<ExerciseModel>> GetAllAsync(Guid? userId);
    Task<ExerciseModel?> GetByIdAsync(Guid? userId, Guid exerciseId);
    Task<ExerciseModel> CreateAsync(Guid userId, CreateExerciseModel model);
    Task UpdateAsync(Guid userId, Guid exerciseId, UpdateExerciseModel model);
    Task DeleteAsync(Guid userId, Guid exerciseId);
}