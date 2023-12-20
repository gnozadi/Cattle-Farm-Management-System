using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Cattleision.Models.Barnyards
{
    public abstract class BaseBarnyardDet
    {

        [Required]
        public int Number {  get; set; }
        [Required]
       
        public TimeOnly MilkingTime { get; set; }
        [Required]
        public int total_Cow_count { get; set; }
    }
}
