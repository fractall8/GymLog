using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data;

public class ApplicationUser : IdentityUser<Guid>
{
    public DateTime CreatedAt { get; set; }
}