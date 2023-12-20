using Cattleision.Data;

namespace Cattleision.Models.Cameras
{
    public class CameraDet:BaseCameraDet
    {
        public int Id { get; set; }
        public ConditionType Condition { get; set; }
        public List<AIOutput> outputs { get; set;}
    }
}
