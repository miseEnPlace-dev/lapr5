using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Domain.DTO;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RequestsController : ControllerBase
{
  private readonly RequestService _svc;

  private readonly DeviceTaskService _svcTask;

  public RequestsController(RequestService svc)
  {
    _svc = svc;
  }

  // GET api/requests
  [HttpGet]
  public async Task<ActionResult<IEnumerable<RequestDTO>>> GetAll()
  {
    if (Request.Query.ContainsKey("state"))
      return await _svc.GetRequestsByState(Request.Query["state"].ToString());
    if (Request.Query.ContainsKey("userId"))
      return await _svc.GetRequestsByUserId(Request.Query["userId"].ToString());

    return await _svc.GetAllAsync();
  }

  // GET api/requests/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<RequestDTO>> Get(string id)
  {
    var t = await _svc.GetByIdAsync(new RequestId(id));
    if (t == null) return NotFound();
    return Ok(t);
  }

  // POST api/requests/surveillance
  [HttpPost("surveillance")]
  public async Task<ActionResult<SurveillanceRequestDTO>> Create(SurveillanceRequestDTO dto)
  {
    try
    {
      if (dto == null)
        return BadRequest("Request is null");

      var t = await _svc.AddAsyncSurveillanceRequest(dto);

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
  public async Task<ActionResult<PickDeliveryRequestDTO>> Create(PickDeliveryRequestDTO dto)
  {
    try
    {
      if (dto == null)
        return BadRequest("Request DTO is null");

      var t = await _svc.AddAsyncPickAndDeliveryRequest(dto);

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
  public async Task<ActionResult<RequestDTO>> Put(string id, RequestDTO dto)
  {
    if (id != dto.Id.ToString()) return BadRequest();

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

  // Inactivate api/requests/5
  [HttpDelete("{id}")]
  public async Task<ActionResult<RequestDTO>> SoftDelete(string id)
  {
    /* var t = await _svc.InactivateAsync(new RequestId(id));
    if (t == null) return NotFound();
    return Ok(t); */
    return BadRequest(new { Message = "Not implemented" });
  }

  // DELETE api/requests/5/hard
  [HttpDelete("{id}/hard")]
  public async Task<ActionResult<RequestDTO>> HardDelete(string id)
  {
    try
    {
      var t = await _svc.DeleteAsync(new RequestId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }
}
