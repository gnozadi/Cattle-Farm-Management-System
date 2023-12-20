using System.ComponentModel.DataAnnotations;

namespace Cattleision.Models.ApiUsers
{
    public class UserDet : LoginDet
    {
        [Required]
        public string FarmName { get; set; }
    }
}
