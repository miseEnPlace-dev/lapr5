using System;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
using DDDSample1.Domain.Floor;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.DeviceTasks.SurveillanceTasks
{
  public class SurveillanceRequest : Request
  {
    public RequestDescription Description { get; private set; }
    public UserName UserName { get; private set; }

    public UserPhoneNumber UserPhoneNumber { get; private set; }

    public FloorId FloorId { get; private set; }


    public SurveillanceRequest(RequestId Id, RequestDescription description, UserName UserName, UserPhoneNumber userPhoneNumber, FloorId floorId, int StartCoordinateX, int StartCoordinateY, int EndCoordinateX, int EndCoordinateY, UserId UserId) : base(Id, StartCoordinateX, StartCoordinateY, EndCoordinateX, EndCoordinateY, UserId)
    {
      Description = description;
      this.UserName = UserName;
      UserPhoneNumber = userPhoneNumber;
      FloorId = floorId;
    }

    public void ChangeDescription(RequestDescription description)
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

    public void ChangeState(StateEnum State)
    {
      base.State = new RequestState(State);
    }


    public override void ExecuteTask()
    {
      throw new NotImplementedException();
    }
  }
}
