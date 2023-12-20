using Cattleision.Contracts;
using Cattleision.Data;

namespace Cattleision.Repository
{
    public class AiOutputsRepository : GenericRepository<AIOutput>, IAiOutputsRepository
    {
        private readonly CattelisionDbContext _context;
        public AiOutputsRepository(CattelisionDbContext context) : base(context)
        {
            this._context = context;    
        }
    }
}
