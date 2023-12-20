
using System.ComponentModel.DataAnnotations;

namespace Cattleision.Models.Barnyards
{
    public class CreateBarnyardDet:BaseBarnyardDet
    {
        [Required]
        public int ownerID { get; set; }
    }
}
