using Cattleision.Contracts;
using Cattleision.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Cattleision.Repository
{
    public class BarnyardsRepository : GenericRepository<Barnyard>, IBarnyardsRepository
    {
        private readonly CattelisionDbContext _context;
        public BarnyardsRepository(CattelisionDbContext context) : base(context)
        {
            this._context = context;
        }

        /*public async Task<List<Barnyard>> GetAllDetails()
        {
             return await _context.Barnyards.Sum(b => b.total_Cow_count);
        }*/

        //need to be fixed
        public async Task<Barnyard> GetDetail(int id)
        {

            /*return await _context.Barnyards.Include(q=>q.AIOutputs
            .GroupBy(o => o.OutputDate)).FirstOrDefaultAsync(q => q.Id == id);*/
            return await _context.Barnyards.Include(q => q.Cameras)
                .ThenInclude(a=>a.Outputs.GroupBy(o => o.OutputDate)).FirstOrDefaultAsync(q => q.Id == id);
        }
        public async Task<List<Barnyard>> GetDetails()
        {
  
            return await _context.Barnyards.Include(q => q.Cameras.Count).Include(q=>q.Cameras)
                .ThenInclude(a=>a.Outputs.OrderByDescending(o=>o.OutputDate).Select(a=>a.OutputDate)).ToListAsync();
        }
    }
}
