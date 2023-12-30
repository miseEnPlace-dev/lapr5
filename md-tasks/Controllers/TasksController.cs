using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.DeviceTasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using DDDSample1.Domain.DTO;

namespace DDDSample1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
  private readonly DeviceTaskService service;

  public TasksController(DeviceTaskService svc)
  {
    service = svc;
  }

  // GET api/Tasks
  [HttpGet]
  public async Task<ActionResult<IEnumerable<DeviceTaskDto>>> GetAll()
  {
    return null;
    // TODO return await service.GetAllAsync();
  }

  // GET api/Tasks/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<DeviceTaskDto>> Get(string id)
  {
    var t = await service.GetByIdAsync(new DeviceTaskId(id));
    if (t == null) return NotFound();
    return t;
  }

  // POST api/Tasks/surveillance
  [HttpPost("surveillance")]
  public async Task<ActionResult<SurveillanceTaskDTO>> Create(SurveillanceTaskDTO dto)
  {
    try
    {
      if (dto == null) return BadRequest("Task cannot be null");

      var t = await service.AddSurveillanceTask(dto);

      if (t == null)
        return BadRequest(new { message = "Could not create surveillance task" });

      if (t.Id == null)
        return BadRequest(new { message = "Surveillance task Id is null" });

      return CreatedAtAction(nameof(Get), new { id = t.Id }, t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // POST api/Tasks/pick-delivery
  [HttpPost("pick-delivery")]
  public async Task<ActionResult<PickAndDeliveryTaskDTO>> CreatePickDelivery(PickAndDeliveryTaskDTO dto)
  {
    try
    {
      if (dto == null) return BadRequest("Task cannot be null");

      var t = await service.AddPickAndDeliveryTask(dto);

      if (t == null)
        return BadRequest(new { message = "Could not create pick and delivery task" });

      if (t.Id == null)
        return BadRequest(new { message = "Pick and delivery task Id is null" });

      return CreatedAtAction(nameof(Get), new { id = t.Id }, t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // PUT api/Tasks/5
  [HttpPut("{id}")]
  public async Task<ActionResult<DeviceTaskDto>> Put(string id, DeviceTaskDto dto)
  {
    if (id != dto.Id) return BadRequest();

    try
    {
      var t = await service.UpdateAsync(dto);
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
  public async Task<ActionResult<DeviceTaskDto>> Delete(string id)
  {
    try
    {
      var t = await service.DeleteAsync(new DeviceTaskId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }
}
