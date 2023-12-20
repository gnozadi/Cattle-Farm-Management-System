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
using Cattleision.Models.Cameras;

namespace Cattleision.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CamerasController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICamerasRepository _camerasRepository;

        public CamerasController(IMapper mapper, ICamerasRepository camerasRepository)
        {
            this._mapper = mapper;
            this._camerasRepository = camerasRepository;
        }

        // GET: api/Cameras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Camera>>> GetCameras()
        {
            var Cameras = await _camerasRepository.GetAllAsync();
            var records = _mapper.Map<List<Camera>>(Cameras);
            return Ok(records);
        }

        // GET: api/Cameras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Camera>> GetCamera(int id)
        {
            var camera = await _camerasRepository.GetAsync(id);
            var record = _mapper.Map<Camera>(camera);

            if (camera == null)
            {
                return NotFound();
            }

            return record;
        }

        // PUT: api/Cameras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCamera(int id, UpdateCameraDet updateCameraDet)
        {
            if (id != updateCameraDet.Id)
            {
                return BadRequest();
            }

            var camera = await _camerasRepository.GetAsync(id);
            if (camera == null)
            {
                return NotFound();
            }

            _mapper.Map(updateCameraDet, camera);

            try
            {
                await _camerasRepository.UpdateAsync(camera);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await CameraExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cameras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Camera>> PostCamera(CreateCameraDet createCameraDet)
        {
            var camera = _mapper.Map<Camera>(createCameraDet);
            await _camerasRepository.AddAsync(camera);

            return CreatedAtAction("GetCamera", new { id = camera.Id }, camera);
        }

        // DELETE: api/Cameras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCamera(int id)
        {
            var camera = await _camerasRepository.GetAsync(id);
            if (camera == null)
            {
                return NotFound();
            }

            _camerasRepository.DeleteAsync(id);

            return NoContent();
        }

        private async Task<bool> CameraExists(int id)
        {
            return await _camerasRepository.Exists(id);
        }
    }
}
