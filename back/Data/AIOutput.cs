using System.ComponentModel.DataAnnotations.Schema;

namespace Cattleision.Data
{
    public class AIOutput
    {
        public int Id { get; set; }
        public int Cow_count { get; set; }
        public float CI_value { get; set; }
        public OutputType outputType { get; set; }
        public DateOnly OutputDate { get; set; }

        //[ForeignKey(nameof(CameraId))]
        public int CameraId { get; set; }
        public Camera Camera { get; set; }
        //[ForeignKey(nameof (BarnyardId))]
        /*public int BarnyardId { get; set; }
        public Barnyard Barnyard { get; set; }*/
    }
}
