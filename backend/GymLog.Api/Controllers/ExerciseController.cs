using GymLog.Api.Models;
using GymLog.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymLog.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ExercisesController(IExerciseService exerciseService) : ControllerBase
{
    // temp
    private readonly Guid UserId = Guid.Parse("00000000-0000-0000-0000-000000000001");
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ExerciseModel>>> GetAllExercises()
    {
        var exercises = await exerciseService.GetAllAsync(UserId);
        
        return Ok(exercises);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ExerciseModel>> GetById(Guid id)
    {
        var exercise = await exerciseService.GetByIdAsync(id, UserId);

        if (exercise == null)
        {
            return NotFound();
        }
        
        return Ok(exercise);
    }

    [HttpPost]
    public async Task<ActionResult<ExerciseModel>> CreateExerciseAsync([FromBody] CreateExerciseModel model)
    {
        var ex = await exerciseService.CreateAsync(model, UserId);
        
        return Ok(ex); 
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExerciseAsync(Guid id, [FromBody] UpdateExerciseModel model)
    {
        await exerciseService.UpdateAsync(model, id, UserId);
        
        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteExerciseAsync(Guid id)
    {
        await exerciseService.DeleteAsync(id, UserId);
        
        return Ok();
    }
}