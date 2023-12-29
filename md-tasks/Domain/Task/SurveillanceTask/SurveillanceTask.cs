using System;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;
using DDDSample1.Domain.Floor;
using DDDSample1.Domain.Room;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTask
{
  public class SurveillanceTask : DeviceTask
  {
    public TaskDescription Description { get; private set; }
    public UserName UserName { get; private set; }

    public UserPhoneNumber UserPhoneNumber { get; private set; }

    public FloorId FloorId { get; private set; }

    public int StartCoordinateX { get; private set; }
    public int StartCoordinateY { get; private set; }
    public int EndCoordinateX { get; private set; }
    public int EndCoordinateY { get; private set; }

    public SurveillanceTask(DeviceTaskId Id, TaskDescription description, UserName UserName, UserPhoneNumber userPhoneNumber, FloorId floorId, int StartCoordinateX, int StartCoordinateY, int EndCoordinateX, int EndCoordinateY, UserId userId) : base(Id, userId)
    {
      Description = description;
      this.UserName = UserName;
      UserPhoneNumber = userPhoneNumber;
      this.StartCoordinateX = StartCoordinateX;
      this.StartCoordinateY = StartCoordinateY;
      this.EndCoordinateX = EndCoordinateX;
      this.EndCoordinateY = EndCoordinateY;
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
