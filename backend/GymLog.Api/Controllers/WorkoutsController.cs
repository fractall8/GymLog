using GymLog.Api.Models;
using GymLog.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymLog.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class WorkoutsController(IWorkoutService workoutService) : ControllerBase
{
    // temp
    private readonly Guid UserId = Guid.Parse("00000000-0000-0000-0000-000000000001");
    
    [HttpGet("active")]
    public async Task<ActionResult<WorkoutModel>> GetActiveWorkout()
    {
        var workout = await workoutService.GetActiveWorkoutAsync(UserId);

        if (workout == null)
        {
            return NotFound(); 
        }

        return Ok(workout);
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkoutModel>>> GetAllWorkouts()
    {
        var workouts = await workoutService.GetWorkoutsAsync(UserId);
        
        return Ok(workouts);
    }

    [HttpPost]
    public async Task<ActionResult<WorkoutModel>> CreateWorkout([FromBody] CreateWorkoutModel model)
    {
        var workout = await workoutService.StartWorkoutAsync(model, UserId);

        if (workout == null)
        {
            return BadRequest();
        }
        
        return Ok(workout);
    }

    [HttpPatch("finish")]
    public async Task<IActionResult> FinishWorkout()
    {
        await workoutService.FinishWorkoutAsync(UserId);

        return NoContent();
    }  
}