namespace GymLog.Api.Entities;

public class WorkoutSet
{
    public Guid Id { get; set; }
    
    public Guid WorkoutId { get; set; }
    
    public double Weight { get; set; }
    
    public int Reps { get; set; }
    
    public Exercise Exercise { get; set; }
    public Workout Workout { get; set; }
}