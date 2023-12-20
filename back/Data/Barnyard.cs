using System.ComponentModel.DataAnnotations.Schema;

namespace Cattleision.Data
{
    public class Barnyard
    {
        
        public int Id {  get; set; }
        public int total_Cow_count { get; set; }

        //[ForeignKey(nameof(OwnerId))]
        public int OwnerId { get; set; }
        public ApiUser User { get; set; }
        public int Number {  get; set; }
        public TimeOnly MilkingTime { get; set; }
        public virtual IList<Camera> Cameras { get; set; }
        //public virtual IList<AIOutput> AIOutputs { get; set; }

    }
}
