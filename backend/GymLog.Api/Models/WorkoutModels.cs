namespace GymLog.Api.Models;

public class WorkoutModel
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public string? Description { get; set; }
    
    public List<WorkoutSetModel> Sets { get; set; } = new();
}

public class CreateWorkoutModel
{
    public string Name { get; set; } = string.Empty;
    
    public string? Description { get; set; }

    public List<WorkoutSetModel> Sets { get; set; } = new();
}