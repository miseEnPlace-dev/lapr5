using System.Collections.Generic;
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
  private readonly IRequestService requestsService;

  private readonly DeviceTaskService deviceTaskService;

  public RequestsController(RequestService requestsService)
  {
    this.requestsService = requestsService;
  }

  // GET api/requests
  [HttpGet]
  public async Task<ActionResult<IEnumerable<RequestDTO>>> GetAll()
  {
    if (Request.Query.ContainsKey("state"))
      return await requestsService.GetRequestsByState(Request.Query["state"].ToString(), 0, 10);
    if (Request.Query.ContainsKey("userId"))
      return await requestsService.GetRequestsByUserId(Request.Query["userId"].ToString(), 0, 10);

    return await requestsService.GetAll(0, 10);
  }

  // GET api/requests/pick-delivery
  [HttpGet("pick-delivery")]
  public async Task<ActionResult<IEnumerable<RequestDTO>>> GetPickAndDelivery(string state)
  {
    return await requestsService.GetAllPickAndDelivery(0, 10);
  }

  // GET api/requests/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<RequestDTO>> Get(string id)
  {
    var t = await requestsService.GetById(new RequestId(id));
    if (t == null) return NotFound();
    return Ok(t);
  }

  // Patch api/requests/{id}/accept
  [HttpPatch("{id}/accept")]
  public async Task<ActionResult<RequestDTO>> AcceptRequest(string id)
  {
    try
    {
      var t = await requestsService.AcceptRequest(new RequestId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // Patch api/requests/{id}/accept
  [HttpPatch("{id}/reject")]
  public async Task<ActionResult<RequestDTO>> RejectRequest(string id)
  {
    try
    {
      var t = await requestsService.RejectRequest(new RequestId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // POST api/requests/surveillance
  [HttpPost("surveillance")]
  public async Task<ActionResult<SurveillanceRequestDTO>> Create(SurveillanceRequestDTO dto)
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
  public async Task<ActionResult<PickDeliveryRequestDTO>> Create(PickDeliveryRequestDTO dto)
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
  public async Task<ActionResult<RequestDTO>> Put(string id, RequestDTO dto)
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
      var t = await requestsService.Delete(new RequestId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }
}
