using GymLog.Api.Models;

namespace GymLog.Api.Services;

public interface IAuthService
{
    Task<RegisterResult> RegisterAsync(RegisterModel model);
    
    Task<LoginResult> LoginAsync(LoginModel model);
    
    Task<UserModel?> GetMeAsync(Guid userId);
}