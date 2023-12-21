using System.Collections.Generic;
using System.Threading.Tasks;
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

  public RequestsController(RequestService svc)
  {
    _svc = svc;
  }

  // GET api/Requests
  [HttpGet]
  public async Task<ActionResult<IEnumerable<IRequestDTO>>> GetAll()
  {
    if (Request.Query.ContainsKey("State"))
      return await _svc.GetRequestsByState(Request.Query["State"].ToString());
    return await _svc.GetAllAsync();
  }

  // GET api/Requests/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<IRequestDTO>> Get(string id)
  {
    var t = await _svc.GetByIdAsync(new RequestId(id));
    if (t == null) return NotFound();
    return Ok(t);
  }

  // POST api/Requests/Surveillance
  [HttpPost("Surveillance")]
  public async Task<ActionResult<SurveillanceRequestDTO>> Create(SurveillanceRequestDTO dto)
  {
    try
    {
      var t = await _svc.AddAsync(dto);
      return CreatedAtAction(nameof(Get), new { id = t.Id }, t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // POST api/Requests/PickAndDelivery
  [HttpPost("PickAndDelivery")]
  public async Task<ActionResult<PickDeliveryRequestDTO>> Create(PickDeliveryRequestDTO dto)
  {
    try
    {
      var t = await _svc.AddAsync(dto);
      return CreatedAtAction(nameof(Get), new { id = t.Id }, t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // PUT api/Requests/5
  [HttpPut("{id}")]
  public async Task<ActionResult<IRequestDTO>> Put(string id, RequestDTO dto)
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

  // Inactivate api/Requests/5
  [HttpDelete("{id}")]
  public async Task<ActionResult<IRequestDTO>> SoftDelete(string id)
  {
    /* var t = await _svc.InactivateAsync(new RequestId(id));
    if (t == null) return NotFound();
    return Ok(t); */
    return BadRequest(new { Message = "Not implemented" });
  }

  // DELETE api/Requests/5/hard
  [HttpDelete("{id}/hard")]
  public async Task<ActionResult<IRequestDTO>> HardDelete(string id)
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
