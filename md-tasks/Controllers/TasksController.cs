using System.Threading.Tasks;
using MDTasks.Services;
using MDTasks.Domain.DTO;
using MDTasks.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using MDTasks.Domain.Tasks;

namespace MDTasks.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
  private readonly ITaskService svc;

  public TasksController(ITaskService svc)
  {
    this.svc = svc;
  }

  // GET api/tasks
  [HttpGet]
  public async Task<ActionResult<PaginationDTO<TaskDTO>>> GetAll()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await svc.GetAll(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await svc.GetAll(-1, -1);
  }

  // GET api/tasks/pick-delivery
  [HttpGet("pick-delivery")]
  public async Task<ActionResult<PaginationDTO<PickAndDeliveryRequestDTO>>> GetPickAndDelivery()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await svc.GetAllPickAndDelivery(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await svc.GetAllPickAndDelivery(-1, -1);
  }

  // GET api/tasks/surveillance
  [HttpGet("surveillance")]
  public async Task<ActionResult<PaginationDTO<SurveillanceRequestDTO>>> GetSurveillance()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await svc.GetAllSurveillance(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await svc.GetAllSurveillance(-1, -1);
  }

  // GET api/tasks/sequence
  [HttpGet("sequence")]
  public async Task<ActionResult<SequenceDTO>> GetSequence()
  {
    return Ok(await svc.GetApprovedTasksSequence());
  }

  // GET api/tasks/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<TaskDTO>> Get(string id)
  {
    var t = await svc.GetById(new TaskId(id));
    if (t == null) return NotFound();
    return Ok(t);
  }

  // POST api/tasks/surveillance
  [HttpPost("surveillance")]
  public async Task<ActionResult<TaskDTO>> CreateSurveillance(TaskDTO dto)
  {
    try
    {
      if (dto == null)
        return BadRequest("Request is null");

      var t = await svc.AddSurveillanceTask(dto);

      if (t == null)
        return BadRequest("Failed to create surveillance request");

      if (t.Id == null)
        return BadRequest("Surveillance request Id is null");

      return CreatedAtAction(nameof(Get), new { id = t.Id }, t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // POST api/tasks/pick-delivery 
  [HttpPost("pick-delivery")]
  public async Task<ActionResult<TaskDTO>> CreatePickDelivery(TaskDTO dto)
  {
    try
    {
      if (dto == null)
        return BadRequest("Request DTO is null");

      var t = await svc.AddPickAndDeliveryTask(dto);

      if (t == null)
        return BadRequest("Failed to create pick and delivery request");


      if (t.Id == null)
        return BadRequest("Pick and Delivery request Id is null");

      return CreatedAtAction(nameof(Get), new { id = t.Id }, t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // PUT api/tasks/5
  [HttpPut("{id}")]
  public async Task<ActionResult<TaskDTO>> Put(string id, TaskDTO dto)
  {
    if (id != dto.Id.ToString()) return BadRequest();

    try
    {
      var t = await svc.Update(dto);
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // Inactivate api/tasks/5
  [HttpDelete("{id}")]
  public async Task<ActionResult<TaskDTO>> SoftDelete(string id)
  {
    /* var t = await _svc.InactivateAsync(new RequestId(id));
    if (t == null) return NotFound();
    return Ok(t); */
    return BadRequest(new { Message = "Not implemented" });
  }

  // DELETE api/tasks/5/hard
  [HttpDelete("{id}/hard")]
  public async Task<ActionResult<TaskDTO>> HardDelete(string id)
  {
    try
    {
      var t = await svc.Delete(new TaskId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }
}
