using System.Collections.Generic;
using System.Threading.Tasks;
using DDDNetCore.Domain.Request;
using DDDNetCore.Services;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
  private readonly ITaskService taskSvc;
  private readonly IRequestService reqSvc;
  public TasksController(ITaskService taskSvc)
  {
    this.taskSvc = taskSvc;
  }

  // POST api/tasks
  [HttpPost]
  public async Task<ActionResult<TaskDTO>> Create(TaskDTO dto)
  {
    try
    {
      if (dto == null)
        return BadRequest("Request is null");

      var t = await taskSvc.Create(dto);

      if (t == null)
        return BadRequest("Failed to create task");

      if (t.Id == null)
        return BadRequest("Task Id is null");

      return CreatedAtAction(nameof(Get), new { id = t.Id }, t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // GET api/tasks
  [HttpGet]
  public async Task<ActionResult<PaginationDTO<TaskDTO>>> GetAll()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await taskSvc.GetAll(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    if (Request.Query.ContainsKey("filter") && Request.Query.ContainsKey("value") && Request.Query["filter"].ToString() == "device")
      return await taskSvc.GetWithDeviceId(Request.Query["value"].ToString());

    return await taskSvc.GetAll(-1, -1);
  }

  // GET api/tasks/sequence
  [HttpGet("sequence")]
  public async Task<ActionResult<SequenceDTO>> GetSequence()
  {
    if (Request.Query.ContainsKey("deviceId"))
      return Ok(await taskSvc.GetApprovedTasksSequence(Request.Query["deviceId"].ToString()));

    return BadRequest("Specify a device id");
  }

  // GET api/tasks/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<TaskDTO>> Get(string id)
  {
    var t = await taskSvc.GetById(new TaskId(id));
    if (t == null) return NotFound();
    return Ok(t);
  }

  // PATCH api/tasks/{id}
  [HttpPatch("{id}")]
  public async Task<ActionResult<TaskDTO>> Update(string id)
  {
    try
    {
      var t = await taskSvc.FinishTask(new TaskId(id));

      if (t == null)
        return BadRequest("Failed to finish task");

      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }
}
