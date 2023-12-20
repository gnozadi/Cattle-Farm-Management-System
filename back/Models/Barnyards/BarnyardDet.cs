using Cattleision.Data;

namespace Cattleision.Models.Barnyards
{
    public class BarnyardDet:BaseBarnyardDet
    {
        public int Id { get; set; }
        public DateOnly ReportDate {  get; set; }
        public float CCI { get; set; }
        public float SUI { get; set; }
        public float SSI { get; set; }

        //public int Id { get; set; }
        //public int OwnerId { get; set; }

        //public List<Camera> cameras { get; set; }
        //public List<Camera> Barnyards { get; set; }

    }
}
