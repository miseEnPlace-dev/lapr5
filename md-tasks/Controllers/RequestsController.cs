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
public class RequestsController : ControllerBase
{
  private readonly RequestService service;

  public RequestsController(RequestService svc)
  {
    service = svc;
  }

  // GET api/Request
  [HttpGet]
  public async Task<ActionResult<PaginationDTO<RequestDTO>>> GetAll()
  {
    if (Request.Query.ContainsKey("page") && Request.Query.ContainsKey("limit"))
      return await service.GetAllAsync(int.Parse(Request.Query["page"].ToString()), int.Parse(Request.Query["limit"].ToString()));

    return await service.GetAllAsync(-1, -1);
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
  public async Task<ActionResult<RequestDto>> Delete(string id)
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
}
