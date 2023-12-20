using Cattleision.Data;

namespace Cattleision.Models.Cameras
{
    public class CreateCameraDet:BaseCameraDet
    {
        public DateTime Installment_Date = DateTime.Today;
        public ConditionType ConditionType = ConditionType.Functional;

    }
}
