namespace GymLog.Api.Models;

public class CreateExerciseModel
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string? MediaUrl { get; set; }
}