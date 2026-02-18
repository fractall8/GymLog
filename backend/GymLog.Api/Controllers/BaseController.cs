using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace GymLog.Api.Controllers;

[ApiController]
public class BaseController : ControllerBase
{
    protected Guid CurrentUserId 
    {
        get
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            if (string.IsNullOrEmpty(userIdClaim))
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            return Guid.Parse(userIdClaim);
        }
    }
}