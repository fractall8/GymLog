using GymLog.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace GymLog.Api.Services;

public class GymLogDbContext : DbContext
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
    }
}