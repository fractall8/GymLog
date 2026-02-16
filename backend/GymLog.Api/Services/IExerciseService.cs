using GymLog.Api.Models;

namespace GymLog.Api.Services;

public interface IExerciseService
{
    Task<IEnumerable<ExerciseModel>> GetAllAsync(Guid? userId);
    Task<ExerciseModel?> GetByIdAsync(Guid id, Guid? userId);
    Task<ExerciseModel> CreateAsync(CreateExerciseModel model, Guid userId);
    Task UpdateAsync(UpdateExerciseModel model, Guid id, Guid userId);
    Task DeleteAsync(Guid id, Guid userId);
}