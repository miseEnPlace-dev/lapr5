using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly TaskService _svc;

    public TasksController(TaskService svc)
    {
        _svc = svc;
    }

    // GET api/Tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetAll()
    {
        return null;
        // TODO return await _svc.GetAllAsync();
    }

    // GET api/Tasks/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDto>> Get(string id)
    {
        var t = await _svc.GetByIdAsync(new TaskId(id));
        if (t == null) return NotFound();
        return t;
    }

    // POST api/Tasks
    [HttpPost]
    public void Create(TaskDto dto) // Task<ActionResult<TaskDto>>
    {
        // var t = await _svc.AddAsync()
    }

    // PUT api/Tasks/5
    [HttpPut("{id}")]
    public async Task<ActionResult<TaskDto>> Put(string id, TaskDto dto)
    {
        if (id != dto.Id) return BadRequest();

        try
        {
            var t = await _svc.UpdateAsync(dto);
            if (t == null) return NotFound();
            return Ok(t);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
    }

    // DELETE api/Tasks/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<TaskDto>> Delete(string id)
    {
        try
        {
            var t = await _svc.DeleteAsync(new TaskId(id));
            if (t == null) return NotFound();
            return Ok(t);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { ex.Message });
        }
    }
}
