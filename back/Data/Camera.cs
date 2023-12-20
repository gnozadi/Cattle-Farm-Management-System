using System.ComponentModel.DataAnnotations.Schema;

namespace Cattleision.Data
{
    public class Camera
    {
        public int Id { get; set; }
        public string Link { get; set; }
        public DateTime Installment_Date { get; set; }
        public ConditionType Condition { get; set; }
        //[ForeignKey(nameof(Barnyard_ID))]
        public int BarnyardId { get; set; }
        public Barnyard Barnyard { get; set; }

        /*[ForeignKey(nameof(OwnerId))]
        public int OwnerId { get; set; }
        public ApiUser User { get; set; }
        */
        public virtual IList<AIOutput> Outputs { get; set; }
        

    }
}
