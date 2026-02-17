using GymLog.Api.Models;
using GymLog.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymLog.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse?>> RegisterAsync(RegisterModel model)
    {
        var res = await authService.RegisterAsync(model);

        if (res == null)
        {
            return BadRequest();
        }
        
        return Ok(res);
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse?>> LoginAsync(LoginModel model)
    {
        var res = await authService.LoginAsync(model);

        if (res == null)
        {
            return BadRequest();
        }
        
        return Ok(res);
    }
}