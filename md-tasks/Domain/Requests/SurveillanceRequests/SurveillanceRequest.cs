using System;
using MDTasks.Domain.Floor;
using MDTasks.Domain.User;

namespace MDTasks.Domain.Requests;

public class SurveillanceRequest : Request
{
  public UserName UserName { get; private set; }
  public UserPhoneNumber UserPhoneNumber { get; private set; }
  public FloorId FloorId { get; private set; }

  public SurveillanceRequest(RequestId id, RequestDescription description, UserName userName, UserPhoneNumber userPhoneNumber, FloorId floorId, int startCoordinateX, int startCoordinateY, int endCoordinateX, int endCoordinateY, UserId userId) : base(id, startCoordinateX, startCoordinateY, endCoordinateX, endCoordinateY, userId, description)
  {
    UserName = userName;
    UserPhoneNumber = userPhoneNumber;
    FloorId = floorId;
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
