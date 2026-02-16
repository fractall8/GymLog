namespace GymLog.Api.Models;

public class ExerciseModel
{
    public Guid Id { get; set; }
    
    public Guid? UserId { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string? MediaUrl { get; set; }
}