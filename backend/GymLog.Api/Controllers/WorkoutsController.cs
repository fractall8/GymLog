using System.Security.Claims;
using GymLog.Api.Models;
using GymLog.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymLog.Api.Controllers;

[Authorize]
[Route("[controller]")]
public class WorkoutsController(IWorkoutService workoutService) : BaseController
{
    [HttpGet("active")]
    public async Task<ActionResult<WorkoutModel>> GetActiveWorkout()
    {
        var workout = await workoutService.GetActiveWorkoutAsync(CurrentUserId);

        if (workout == null)
        {
            return NotFound(); 
        }

        return Ok(workout);
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkoutModel>>> GetAllWorkouts()
    {
        var workouts = await workoutService.GetWorkoutsAsync(CurrentUserId);
        
        return Ok(workouts);
    }

    [HttpPost]
    public async Task<ActionResult<WorkoutModel>> CreateWorkout([FromBody] CreateWorkoutModel model)
    {
        var workout = await workoutService.StartWorkoutAsync(model, CurrentUserId);

        if (workout == null)
        {
            return BadRequest();
        }
        
        return Ok(workout);
    }

    [HttpPatch("finish")]
    public async Task<IActionResult> FinishWorkout()
    {
        await workoutService.FinishWorkoutAsync(CurrentUserId);

        return NoContent();
    }  
}