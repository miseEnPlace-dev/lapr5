using System;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTask;
public class SurveillanceTaskDto
{
  public Guid Id { get; set; }

  public bool Active { get; set; }

  public string Description { get; set; }

  public string UserContact { get; set; }

  public string TargetFloor { get; set; }

  public SurveillanceTaskDto(Guid Id, bool Active, string Description, string UserContact, string TargetFloor)
  {
    this.Id = Id;
    this.Active = Active;
    this.Description = Description;
    this.UserContact = UserContact;
    this.TargetFloor = TargetFloor;
  }
}