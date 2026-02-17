namespace GymLog.Api.Entities;

public class Workout
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    public string Name { get; set; }
    
    public string? Description { get; set; }
    
    public DateTime StartedAt { get; set; }
    
    public DateTime? FinishedAt { get; set; }

    public List<WorkoutSet> WorkoutSets { get; set; } = new();
}