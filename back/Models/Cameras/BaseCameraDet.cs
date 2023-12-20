using System.ComponentModel.DataAnnotations;

namespace Cattleision.Models.Cameras
{
    public abstract class BaseCameraDet
    {
        [Required]
        public string Link { get; set; }
        [Required]
        public int Barnyard_ID { get; set; }


    }
}
