using System;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;
using DDDSample1.Domain.Floor;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTask
{
  public class SurveillanceTask : DeviceTask
  {
    public TaskDescription Description { get; private set; }
    public UserEmail UserContact { get; private set; }
    public FloorId FloorId { get; private set; }

    public SurveillanceTask(DeviceTaskId Id, TaskDescription description, UserEmail userContact, FloorId floorId) : base(Id)
    {
      Description = description;
      UserContact = userContact;
      FloorId = floorId;
    }

    public void ChangeDescription(TaskDescription description)
    {
      Description = description;
    }

    public void ChangeUserContact(UserEmail userContact)
    {
      UserContact = userContact;
    }

    public void ChangeTargetFloor(FloorId targetFloor)
    {
      FloorId = targetFloor;
    }

    public override void ExecuteTask()
    {
      throw new NotImplementedException();
    }
  }
}
