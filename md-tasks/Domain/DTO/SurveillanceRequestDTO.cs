using System;
using DDDSample1.Domain.Requests;

namespace DDDSample1.Domain.DTO;

public class SurveillanceRequestDTO : RequestDTO
{
  public string ContactEmail { get; set; }

  public string FloorCode { get; set; }

  public SurveillanceRequestDTO(string userEmail, string requestedAt, string contactEmail, string floorCode) : base(userEmail, requestedAt)
  {
    this.ContactEmail = contactEmail;
    this.FloorCode = floorCode;
  }

  public SurveillanceRequestDTO(string id, string userEmail, string requestedAt, string state, string contactEmail, string floorCode) : base(id, userEmail, requestedAt, state)
  {
    this.ContactEmail = contactEmail;
    this.FloorCode = floorCode;
  }
}