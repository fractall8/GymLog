using Microsoft.AspNetCore.Identity;

namespace GymLog.Api.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public DateTime CreatedAt { get; set; }
}