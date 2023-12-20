using Cattleision.Data;

namespace Cattleision.Contracts
{
    public interface ICamerasRepository : IGenericRepository<Camera>
    {
        Task<ConditionType> Condition(int id);
        Task<Camera> Details(int id);
    }
}
