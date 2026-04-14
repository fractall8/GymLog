using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class GymLogDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public GymLogDbContext(DbContextOptions<GymLogDbContext> options) : base(options) { }

    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<Workout> Workouts { get; set; }
    public DbSet<WorkoutSet> Sets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<WorkoutSet>()
            .HasOne(ws => ws.Workout)
            .WithMany(w => w.WorkoutSets)
            .HasForeignKey(s => s.WorkoutId);
        
        // Seed basic Exercise data
        modelBuilder.Entity<Exercise>().HasData(
            new Exercise
            {
                Id = Guid.Parse("018da72d-1234-7000-8000-000000000001"),
                Name = "Bench Press",
                Description = "A basic exercise for developing the pectoral muscles, triceps and anterior deltoids.",
                UserId = null
            },
            new Exercise
            {
                Id = Guid.Parse("018da72d-1234-7000-8000-000000000002"),
                Name = "Barbell squats",
                Description = "A fundamental exercise for the leg and core muscles.",
                UserId = null
            },
            new Exercise
            {
                Id = Guid.Parse("018da72d-1234-7000-8000-000000000003"),
                Name = "Deadlift",
                Description = "An exercise to develop back, leg muscles and grip strength.",
                UserId = null
            },
            new Exercise
            {
                Id = Guid.Parse("018da72d-1234-7000-8000-000000000004"),
                Name = "Pull-ups",
                Description = "The best bodyweight exercise for the back and biceps muscles.",
                UserId = null
            },
            new Exercise
            {
                Id = Guid.Parse("018da72d-1234-7000-8000-000000000005"),
                Name = "Military press",
                Description = "Standing barbell press for shoulder girdle development.",
                UserId = null
            }
        );
    }
}