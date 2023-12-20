using Cattleision.Data;

namespace Cattleision.Contracts
{
    public interface IBarnyardsRepository:IGenericRepository<Barnyard>
    {
        Task<Barnyard> GetDetail(int id);
        Task<List<Barnyard>> GetDetails();

    }
}
