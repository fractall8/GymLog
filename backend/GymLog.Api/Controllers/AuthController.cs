using System.Security.Claims;
using GymLog.Api.Models;
using GymLog.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymLog.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync(RegisterModel model)
    {
        var res = await authService.RegisterAsync(model);

        if (res == null)
        {
            return BadRequest();
        }
        
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = res.Expiry
        };

        Response.Cookies.Append("gymlog_token", res.Token, cookieOptions);
        
        return Ok(new { userName = res.UserName });
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync(LoginModel model)
    {
        var res = await authService.LoginAsync(model);

        if (res == null)
        {
            return BadRequest();
        }
        
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = res.Expiry
        };

        Response.Cookies.Append("gymlog_token", res.Token, cookieOptions);
        
        return Ok(new { userName = res.UserName });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> LogoutAsync()
    {
        Response.Cookies.Delete("gymlog_token", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });
        
        return Ok(new { message = "Log out successfully." });
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserModel>> GetMeAsync()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
        {
            return NotFound();
        }
        
        var userId = Guid.Parse(userIdClaim);
        var user = await authService.GetMeAsync(userId);

        if (user == null)
        {
            return NotFound();
        }
        
        return Ok(user);
    }
    
}