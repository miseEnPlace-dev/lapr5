using System;
using DDDSample1.Domain.Floor;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTask
{
  public class SurveillanceTask : DeviceTask
  {
    public string Description { get; private set; }

    public UserEmail UserContact { get; private set; }

    public FloorId TargetFloor { get; private set; }

    public SurveillanceTask(string description, UserEmail userContact)
    {
      Description = description;
      UserContact = userContact;
    }


    public void ChangeDescription(string description)
    {
      Description = description;
    }

    public void ChangeUserContact(UserEmail userContact)
    {
      UserContact = userContact;
    }

    public void ChangeTargetFloor(FloorId targetFloor)
    {
      TargetFloor = targetFloor;
    }

    public override void ExecuteTask()
    {
      throw new NotImplementedException();
    }
  }
}
