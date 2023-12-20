using Cattleision.Data;

namespace Cattleision.Models.AiOutputs
{
    public abstract class BaseAiOutputDet
    {
        public DateOnly outputDate {  get; set; }
        public int Cow_count { get; set; }
        public float CI_value { get; set; }
        public OutputType outputType { get; set; }
        public int CameraId { get; set; }
    }
}
