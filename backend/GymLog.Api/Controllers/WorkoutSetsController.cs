using System.Security.Claims;
using GymLog.Api.Models;
using GymLog.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymLog.Api.Controllers;

[Authorize]
[ApiController]
[Route("workouts/{workoutId}/sets")]
public class WorkoutSetsController(IWorkoutSetService setService) : ControllerBase
{
    protected Guid UserId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    
    [HttpPost]
    public async Task<ActionResult<WorkoutSetModel>> AddSet(Guid workoutId, [FromBody] CreateSetModel model)
    {
        var result = await setService.AddSetAsync(userId: UserId, workoutId: workoutId, model: model);

        if (result == null)
        {
            return BadRequest();
        }
        
        return Ok(result);
    }

    [HttpDelete("{setId}")]
    public async Task<IActionResult> DeleteSet(Guid setId)
    {
        await setService.DeleteSetAsync(setId, UserId);
        return NoContent();
    }
}