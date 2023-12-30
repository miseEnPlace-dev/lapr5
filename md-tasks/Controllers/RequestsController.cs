using System.Threading.Tasks;
using MDTasks.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using MDTasks.Domain.DTO;
using MDTasks.Domain.Requests;
using MDTasks.Services;

namespace MDTasks.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RequestsController : ControllerBase
{
  private readonly IRequestService svc;

  public RequestsController(IRequestService svc)
  {
    this.svc = svc;
  }

  // GET api/requests
  [HttpGet]
  public async Task<ActionResult<PaginationDTO<RequestDTO>>> GetAll()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await svc.GetAll(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await svc.GetAll(-1, -1);
  }

  // GET api/requests/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<RequestDTO>> Get(string id)
  {
    var t = await svc.GetById(new RequestId(id));
    if (t == null) return NotFound();
    return t;
  }

  // POST api/requests/surveillance
  [HttpPost("surveillance")]
  public async Task<ActionResult<SurveillanceRequestDTO>> Create(SurveillanceRequestDTO dto)
  {
    try
    {
      if (dto == null) return BadRequest("Request cannot be null");

      var t = await svc.AddSurveillanceRequest(dto);

      if (t == null)
        return BadRequest(new { message = "Could not create surveillance request" });

      if (t.Id == null)
        return BadRequest(new { message = "Surveillance request Id is null" });

      return CreatedAtAction(nameof(Get), new { id = t.Id }, t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // POST api/requests/pick-delivery
  [HttpPost("pick-delivery")]
  public async Task<ActionResult<PickAndDeliveryRequestDTO>> CreatePickDelivery(PickAndDeliveryRequestDTO dto)
  {
    try
    {
      if (dto == null) return BadRequest("Request cannot be null");

      var t = await svc.AddPickAndDeliveryRequest(dto);

      if (t == null)
        return BadRequest(new { message = "Could not create pick and delivery request" });

      if (t.Id == null)
        return BadRequest(new { message = "Pick and delivery request Id is null" });

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
    if (id != dto.Id) return BadRequest();

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

  // DELETE api/requests/5
  [HttpDelete("{id}")]
  public async Task<ActionResult<RequestDTO>> Delete(string id)
  {
    try
    {
      var t = await svc.Delete(new RequestId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // PATCH api/tasks/{id}/accept
  [HttpPatch("{id}/accept")]
  public async Task<ActionResult<RequestDTO>> AcceptRequest(string id)
  {
    try
    {
      var t = await svc.AcceptRequest(new RequestId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }

  // PATCH api/tasks/{id}/reject
  [HttpPatch("{id}/reject")]
  public async Task<ActionResult<RequestDTO>> RejectRequest(string id)
  {
    try
    {
      var t = await svc.RejectRequest(new RequestId(id));
      if (t == null) return NotFound();
      return Ok(t);
    }
    catch (BusinessRuleValidationException ex)
    {
      return BadRequest(new { ex.Message });
    }
  }
}
