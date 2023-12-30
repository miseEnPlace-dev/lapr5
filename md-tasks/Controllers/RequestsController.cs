using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.DeviceTasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.DTO;
using DDDNetCore.Domain.Request;
using DDDSample1.Domain.User;
using System;
using DDDNetCore.Services;

namespace DDDSample1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RequestsController : ControllerBase
{
  private readonly IRequestService service;

  public RequestsController(IRequestService svc)
  {
    service = svc;
  }

  // GET api/Request
  [HttpGet]
  public async Task<ActionResult<PaginationDTO<RequestDTO>>> GetAll()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit") && Request.Query.ContainsKey("filter") && Request.Query.ContainsKey("value"))
      if (Request.Query["filter"].ToString() == "state")
        return await service.GetRequestsByState(RequestStateMapper.ToRequestState(Request.Query["value"].ToString()), int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    if (Request.Query["filter"].ToString() == "state" && Request.Query.ContainsKey("value"))
      return await service.GetRequestsByState(RequestStateMapper.ToRequestState(Request.Query["value"].ToString()), -1, -1);

    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      if (Request.Query.ContainsKey("userId"))
        return await service.GetRequestsByUserIdAsync(new UserId(Request.Query["userId"].ToString()), int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));
      else
        return await service.GetAllAsync(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await service.GetAllAsync(-1, -1);
  }

  // GET api/Request/surveillance
  [HttpGet("surveillance")]
  public async Task<ActionResult<PaginationDTO<RequestDTO>>> GetAllSurveillance()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await service.GetAllSurveillanceAsync(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await service.GetAllSurveillanceAsync(-1, -1);
  }

  // GET api/Request/pick-delivery
  [HttpGet("pick-delivery")]
  public async Task<ActionResult<PaginationDTO<RequestDTO>>> GetAllPickDelivery()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await service.GetAllPickDeliveryAsync(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await service.GetAllPickDeliveryAsync(-1, -1);
  }


  // GET api/Request/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<RequestDTO>> Get(string id)
  {
    var t = await service.GetByIdAsync(new RequestId(id));
    if (t == null) return NotFound();
    return t;
  }

  // POST api/Request/surveillance
  [HttpPost("surveillance")]
  public async Task<ActionResult<SurveillanceRequestDTO>> Create(SurveillanceRequestDTO dto)
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

  // POST api/Request/pick-delivery
  [HttpPost("pick-delivery")]
  public async Task<ActionResult<PickAndDeliveryRequestDTO>> CreatePickDelivery(PickAndDeliveryRequestDTO dto)
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

  // PUT api/Request/5
  [HttpPut("{id}")]
  public async Task<ActionResult<RequestDTO>> Put(string id, RequestDTO dto)
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

  // DELETE api/Request/5
  [HttpDelete("{id}")]
  public async Task<ActionResult<RequestDTO>> Delete(string id)
  {
    try
    {
      var t = await service.DeleteAsync(new RequestId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // Patch api/requests/{id}/accept
  [HttpPatch("{id}/accept")]
  public async Task<ActionResult<RequestDTO>> AcceptRequest(string id)
  {
    try
    {
      var t = await service.AcceptRequest(new RequestId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // Patch api/requests/{id}/reject
  [HttpPatch("{id}/reject")]
  public async Task<ActionResult<RequestDTO>> RejectRequest(string id)
  {
    try
    {
      var t = await service.RejectRequest(new RequestId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

}
