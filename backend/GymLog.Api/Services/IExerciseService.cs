using GymLog.Api.Models;

namespace GymLog.Api.Services;

public interface IExerciseService
{
    Task<IEnumerable<ExerciseModel>> GetAllAsync(Guid? userId);
    Task<ExerciseModel?> GetByIdAsync(Guid id);
    Task CreateAsync(CreateExerciseModel model);
    Task UpdateAsync(UpdateExerciseModel model);
    Task DeleteAsync(Guid id);
}