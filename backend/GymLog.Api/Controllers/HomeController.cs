using Microsoft.AspNetCore.Mvc;

namespace GymLog.Api.Controllers;

[ApiController]
[Route("/")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Hello World!");
    }
}