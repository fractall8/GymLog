using GymLog.Api.Models;
using GymLog.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymLog.Api.Controllers;

[Authorize]
[Route("workouts/{workoutId}/sets")]
public class WorkoutSetsController(IWorkoutSetService setService) : BaseController
{
    [HttpPost]
    public async Task<ActionResult<WorkoutSetModel>> AddSet(Guid workoutId, [FromBody] CreateSetModel model)
    {
        var result = await setService.AddSetAsync(userId: CurrentUserId, workoutId: workoutId, model: model);

        if (result == null)
        {
            return BadRequest();
        }
        
        return Ok(result);
    }
    
    [HttpPut("{setId}")]
    public async Task<IActionResult> UpdateSet(Guid setId, [FromBody] UpdateSetModel model)
    {
        var result = await setService.UpdateSetAsync(CurrentUserId, setId, model);

        if (!result)
        {
            return NotFound(new { message = "Set not found" });
        }

        return NoContent();
    }

    [HttpDelete("{setId}")]
    public async Task<IActionResult> DeleteSet(Guid setId)
    {
        var succeeded = await setService.DeleteSetAsync(CurrentUserId, setId);

        if (!succeeded)
        {
            return NotFound(new { message = "Set not found" });
        }
        
        return NoContent();
    }
}