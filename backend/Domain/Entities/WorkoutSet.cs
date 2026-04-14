namespace Domain.Entities;

public enum WorkoutSetType
{
    Warmup,
    Normal,
    Failure
}

public class WorkoutSet
{
    public Guid Id { get; set; }
    
    public Guid WorkoutId { get; set; }
    
    public Guid ExerciseId { get; set; }
    
    public double Weight { get; set; }

    public WorkoutSetType Type { get; set; }

    public int Reps { get; set; }
    
    public DateTime CreatedAt { get; set; } 
    
    public Exercise Exercise { get; set; }
    
    public Workout Workout { get; set; }
}