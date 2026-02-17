namespace GymLog.Api.Models;

public record RegisterModel(string Email, string Password, string UserName);
public record LoginModel(string Email, string Password);
public record AuthResponse(string Token, string UserName, DateTime Expiry);