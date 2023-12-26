using System;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;
using DDDSample1.Domain.Floor;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTask
{
  public class SurveillanceTask : DeviceTask
  {
    public TaskDescription Description { get; private set; }
    public UserName UserName { get; private set; }

    public UserPhoneNumber UserPhoneNumber { get; private set; }

    public FloorId FloorId { get; private set; }

    public SurveillanceTask(DeviceTaskId Id, TaskDescription description, UserName userName, UserPhoneNumber userPhoneNumber, FloorId floorId) : base(Id)
    {
      Description = description;
      UserName = userName;
      UserPhoneNumber = userPhoneNumber;
      FloorId = floorId;
    }

    public void ChangeDescription(TaskDescription description)
    {
      Description = description;
    }

    public void ChangeUserName(UserName userName)
    {
      UserName = userName;
    }

    public void ChangeUserPhoneNumber(UserPhoneNumber userPhoneNumber)
    {
      UserPhoneNumber = userPhoneNumber;
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
