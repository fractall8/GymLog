using System.ComponentModel.DataAnnotations;

namespace Application.Models;

public class ExerciseModel
{
    public Guid Id { get; set; }
    
    public Guid? UserId { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string? MediaUrl { get; set; }
}

public class UpdateExerciseModel
{
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    [Url]
    public string? MediaUrl { get; set; }
}

public class CreateExerciseModel
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    [Url]
    public string? MediaUrl { get; set; }
}