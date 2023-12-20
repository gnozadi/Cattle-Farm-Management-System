using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cattleision.Data;
using AutoMapper;
using Cattleision.Contracts;
using Cattleision.Models.Barnyards;
using System.Diagnostics.Metrics;

namespace Cattleision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BarnyardsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBarnyardsRepository _BarnyardsRepository;

        public BarnyardsController(IMapper mapper, IBarnyardsRepository barnyardsRepository)
        {
            this._mapper = mapper;
            this._BarnyardsRepository = barnyardsRepository;
        }

        // GET: api/Barnyards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Barnyard>>> GetBarnyards()
        {
            var barnyards = await _BarnyardsRepository.GetAllAsync();
            var records = _mapper.Map<List<BarnyardDet>>(barnyards);
            return Ok(records);
        }

        [HttpGet]
        [Route("dashboard")]
        public async Task<ActionResult<IEnumerable<Barnyard>>> GetGeneral()
        {
            var barnyards = await _BarnyardsRepository.GetAllAsync();
            int total_cows = barnyards.Sum(b => b.total_Cow_count);
            int numberOfBarnyards = barnyards.Count();
            List<int> totals = new List<int>{ total_cows, numberOfBarnyards };
            var records = _mapper.Map<TotalBarnyardsDto>(totals);
            return Ok(totals);


        }
        // GET: api/Barnyards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Barnyard>> GetBarnyard(int id)
        {
            var barnyard = await _BarnyardsRepository.GetDetail(id);

            if (barnyard == null)
            {
                return NotFound();
            }
            var barnyardDet = _mapper.Map<BarnyardDet>(barnyard);
            return Ok(barnyardDet);

        }
        [HttpGet]
        [Route("dashboard2")]
        public async Task<ActionResult<IEnumerable<Barnyard>>> GetBarnyardList()
        {
            var barnyards = await _BarnyardsRepository.GetDetails();
            var listDto = _mapper.Map<List<BarnyardDet>>(barnyards);
            return Ok(listDto);



        }

        // PUT: api/Barnyards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBarnyard(int id, UpdateBarnyardDet updateBarnyardDet)
        {
            if (id != updateBarnyardDet.Id)
            {
                return BadRequest();
            }

            var barnyard = await _BarnyardsRepository.GetAsync(id);
            if (barnyard == null)
            {
                return NotFound();
            }

            _mapper.Map(updateBarnyardDet, barnyard);

            try
            {
                await _BarnyardsRepository.UpdateAsync(barnyard);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await BarnyardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Barnyards
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Barnyard>> PostBarnyard(CreateBarnyardDet createBarnyardDet)
        {
            var barnyard = _mapper.Map<Barnyard>(createBarnyardDet);
            await _BarnyardsRepository.AddAsync(barnyard);

            return CreatedAtAction("GetBarnyard", new { id = barnyard.Id }, barnyard);
        }

        // DELETE: api/Barnyards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBarnyard(int id)
        {
            var barnyard = await _BarnyardsRepository.GetAsync(id);
            if (barnyard == null)
            {
                return NotFound();
            }

            await _BarnyardsRepository.DeleteAsync(id);

            return NoContent();
        }

        private async Task<bool> BarnyardExists(int id)
        {
            return await _BarnyardsRepository.Exists(id);
        }
    }
}
