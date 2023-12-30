﻿using System.Threading.Tasks;
using DDDNetCore.Domain.Request;
using DDDNetCore.Services;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
  private readonly ITaskService requestsService;
  private readonly Domain.DeviceTasks.RequestService deviceTaskService;

  public TasksController(Domain.Requests.TaskService requestsService)
  {
    this.requestsService = requestsService;
  }

  // GET api/requests
  [HttpGet]
  public async Task<ActionResult<PaginationDTO<TaskDTO>>> GetAll()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await requestsService.GetAll(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await requestsService.GetAll(-1, -1);
  }

  // GET api/requests/pick-delivery
  [HttpGet("pick-delivery")]
  public async Task<ActionResult<PaginationDTO<PickDeliveryTaskDTO>>> GetPickAndDelivery()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await requestsService.GetAllPickAndDelivery(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await requestsService.GetAllPickAndDelivery(-1, -1);
  }

  // GET api/requests/surveillance
  [HttpGet("surveillance")]
  public async Task<ActionResult<PaginationDTO<SurveillanceTaskDTO>>> GetSurveillance()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await requestsService.GetAllSurveillance(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await requestsService.GetAllSurveillance(-1, -1);
  }

  // GET api/requests/sequence
  [HttpGet("sequence")]
  public async Task<ActionResult<SequenceDTO>> GetSequence()
  {
    return Ok(await requestsService.GetApprovedTasksSequence());
  }

  // GET api/requests/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<TaskDTO>> Get(string id)
  {
    var t = await requestsService.GetById(new TaskId(id));
    if (t == null) return NotFound();
    return Ok(t);
  }

  // POST api/requests/surveillance
  [HttpPost("surveillance")]
  public async Task<ActionResult<TaskDTO>> CreateSurveillance(TaskDTO dto)
  {
    try
    {
      if (dto == null)
        return BadRequest("Request is null");

      var t = await requestsService.AddSurveillanceRequest(dto);

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

  // POST api/requests/pick-delivery 
  [HttpPost("pick-delivery")]
  public async Task<ActionResult<TaskDTO>> CreatePickDelivery(TaskDTO dto)
  {
    try
    {
      if (dto == null)
        return BadRequest("Request DTO is null");

      var t = await requestsService.AddPickAndDeliveryRequest(dto);

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
  // PUT api/requests/5
  [HttpPut("{id}")]
  public async Task<ActionResult<TaskDTO>> Put(string id, TaskDTO dto)
  {
    if (id != dto.Id.ToString()) return BadRequest();

    try
    {
      var t = await requestsService.Update(dto);
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // Inactivate api/requests/5
  [HttpDelete("{id}")]
  public async Task<ActionResult<TaskDTO>> SoftDelete(string id)
  {
    /* var t = await _svc.InactivateAsync(new RequestId(id));
    if (t == null) return NotFound();
    return Ok(t); */
    return BadRequest(new { Message = "Not implemented" });
  }

  // DELETE api/requests/5/hard
  [HttpDelete("{id}/hard")]
  public async Task<ActionResult<TaskDTO>> HardDelete(string id)
  {
    try
    {
      var t = await requestsService.Delete(new TaskId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }
}
