using System.Security.Claims;
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

    [HttpDelete("{setId}")]
    public async Task<IActionResult> DeleteSet(Guid setId)
    {
        await setService.DeleteSetAsync(setId, CurrentUserId);
        return NoContent();
    }
}