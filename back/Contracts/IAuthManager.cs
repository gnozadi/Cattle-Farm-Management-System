using Cattleision.Models.ApiUsers;
using Microsoft.AspNetCore.Identity;

namespace Cattleision.Contracts
{
    public interface IAuthManager
    {
        Task<IEnumerable<IdentityError>> Register(UserDet userDet);
        Task<AuthResponseDet> Login(LoginDet loginDet);
        Task<string> CreateRefreshToken();
        Task<AuthResponseDet> VerifyRefreshToken(AuthResponseDet request);
    }
}
