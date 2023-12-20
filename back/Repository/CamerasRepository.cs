using Cattleision.Contracts;
using Cattleision.Data;
using Microsoft.EntityFrameworkCore;

namespace Cattleision.Repository
{
    public class CamerasRepository : GenericRepository<Camera>, ICamerasRepository
    {
        private readonly CattelisionDbContext _context;
        public CamerasRepository(CattelisionDbContext context) : base(context)
        {
            this._context = context;
        }

        public async Task<ConditionType> Condition(int id)
        {
            var entity = await GetAsync(id);
            return entity.Condition;
        }

        public async Task<Camera> Details(int id)
        {
            return await _context.Cameras.Include(q => q.Outputs)
                .FirstOrDefaultAsync(q => q.Id == id);
        }
    }
}
