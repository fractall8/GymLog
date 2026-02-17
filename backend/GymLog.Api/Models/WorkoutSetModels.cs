namespace GymLog.Api.Models;

public class WorkoutSetModel
{
    public Guid Id { get; set; }
    public Guid ExerciseId { get; set; }
    public string ExerciseName { get; set; } = string.Empty;
    public double Weight { get; set; }
    public int Reps { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateSetModel
{
    public Guid ExerciseId { get; set; }
    public double Weight { get; set; }
    public int Reps { get; set; }
}

public class UpdateSetModel
{
    public double Weight { get; set; }
    public int Reps { get; set; }
}