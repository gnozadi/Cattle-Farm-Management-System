using System.ComponentModel.DataAnnotations;

namespace Cattleision.Models.ApiUsers
{
    public class LoginDet
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(10, ErrorMessage = "Your Password is limited to {2} to {1} characters", MinimumLength = 6)]
        public string Password { get; set; }
    }
}
