using System.Security.Claims;
using GymLog.Api.Models;
using GymLog.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymLog.Api.Controllers;

[Authorize]
[Route("[controller]")]
public class ExercisesController(IExerciseService exerciseService) : BaseController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ExerciseModel>>> GetAllExercises()
    {
        var exercises = await exerciseService.GetAllAsync(CurrentUserId);
        
        return Ok(exercises);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ExerciseModel>> GetById(Guid id)
    {
        var exercise = await exerciseService.GetByIdAsync(CurrentUserId, id);

        if (exercise == null)
        {
            return NotFound();
        }
        
        return Ok(exercise);
    }

    [HttpPost]
    public async Task<ActionResult<ExerciseModel>> CreateExerciseAsync([FromBody] CreateExerciseModel model)
    {
        var ex = await exerciseService.CreateAsync(CurrentUserId, model);
        
        return Ok(ex); 
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExerciseAsync(Guid id, [FromBody] UpdateExerciseModel model)
    {
        await exerciseService.UpdateAsync(CurrentUserId, id, model);
        
        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteExerciseAsync(Guid id)
    {
        await exerciseService.DeleteAsync(CurrentUserId, id);
        
        return Ok();
    }
}