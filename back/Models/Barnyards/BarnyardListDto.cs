namespace Cattleision.Models.Barnyards
{
    public class BarnyardListDto
    {
        public int BarnyardNumber { get; set; }
        public int CameraCount { get; set; }
        public DateOnly lastReport {  get; set; }
    }
}
