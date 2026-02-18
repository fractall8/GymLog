using GymLog.Api.Models;

namespace GymLog.Api.Services;

public interface IAuthService
{
    Task<AuthResponse?> RegisterAsync(RegisterModel model);
    
    Task<AuthResponse?> LoginAsync(LoginModel model);
    
    Task<UserModel?> GetMeAsync(Guid userId);
}