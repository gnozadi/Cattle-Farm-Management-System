using Microsoft.AspNetCore.Identity;

namespace Cattleision.Data
{
    public class ApiUser : IdentityUser
    {
        public string FarmName { get; set; }
        public virtual IList<Barnyard> Barnyards { get; set; }
    }
}
