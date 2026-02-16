namespace GymLog.Api.Entities;

public class Exercise
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string? MediaUrl { get; set; }
    
    // Muscle Group
}