using Application.Models;

namespace Application.Interfaces;

public interface IAuthService
{
    Task<RegisterResult> RegisterAsync(RegisterModel model);
    
    Task<LoginResult> LoginAsync(LoginModel model);
    
    Task<UserModel?> GetMeAsync(Guid userId);
}