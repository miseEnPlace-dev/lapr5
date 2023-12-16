using System;
using DDDSample1.Domain.Floor;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tasks;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.Tasks.SurveillanceTask
{
  public class SurveillanceTask
  {
    public string Description { get; private set; }

    public bool Active { get; private set; }

    public UserId UserContact { get; private set; }

    public FloorId TargetFloor { get; private set; }

    public SurveillanceTask()
    {
      Active = true;
    }

    public SurveillanceTask(string description, UserId userContact)
    {
      Description = description;
      UserContact = userContact;
      Active = true;
    }


    public void ChangeDescription(string description)
    {
      if (!Active)
      {
        throw new BusinessRuleValidationException("Task is not active.");
      }
      Description = description;
    }

    public void ChangeUserContact(UserId userContact)
    {
      if (!Active)
      {
        throw new BusinessRuleValidationException("Task is not active.");
      }
      UserContact = userContact;
    }

    public void ChangeTargetFloor(FloorId targetFloor)
    {
      if (!Active)
      {
        throw new BusinessRuleValidationException("Task is not active.");
      }
      TargetFloor = targetFloor;
    }

    public void Deactivate()
    {
      Active = false;
    }
  }
}