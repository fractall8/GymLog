using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GymLog.Api.Entities;
using GymLog.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace GymLog.Api.Services;

public class AuthService(UserManager<ApplicationUser> userManager, IConfiguration configuration) : IAuthService
{
    public async Task<AuthResponse?> RegisterAsync(RegisterModel model)
    {
        var user = new ApplicationUser
        {
            Email = model.Email,
            UserName = model.UserName,
            CreatedAt = DateTime.UtcNow,
        };

        var result = await userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
        {
            return null;
        }
        
        return await LoginAsync(new LoginModel(user.Email, model.Password));
    }

    public async Task<AuthResponse?> LoginAsync(LoginModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);

        if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
        {
            return null;   
        }
        
        return GenerateJwtToken(user);
    }

    public async Task<UserModel?> GetMeAsync(Guid userId)
    {
        var user = await userManager.FindByIdAsync(userId.ToString());
        if (user == null)
        {
            return null;
        }
        
        return new UserModel(user.Id, user.UserName!, user.Email!);
    }
    
    private AuthResponse GenerateJwtToken(ApplicationUser user)
    {
        var jwtSettings = configuration.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
        
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName!),
            new(JwtRegisteredClaimNames.Email, user.Email!)
        };

        var expiry = DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["DurationInMinutes"]!));

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: expiry,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return new AuthResponse(new JwtSecurityTokenHandler().WriteToken(token), user.UserName!, expiry);
    }
}