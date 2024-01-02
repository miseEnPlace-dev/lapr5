using System;
using MDTasks.Domain.Floor;
using MDTasks.Domain.Task;
using MDTasks.Domain.User;

namespace MDTasks.Domain.Request.Tests;

public class SurveillanceRequestTest
{
  [Fact]
  public void SurveillanceRequest_ShouldSetPropertiesCorrectly()
  {
    var requestId = new RequestId(Guid.NewGuid());
    var userId = new UserId(Guid.NewGuid().ToString());

    var RequestDescription = new RequestDescription("Description");
    var UserName = new UserName("UserName");
    var UserPhoneNumber = new UserPhoneNumber("UserPhoneNumber");
    var FloorId = new FloorId(Guid.NewGuid().ToString());


    var request = new SurveillanceRequest(requestId, RequestDescription, UserName, UserPhoneNumber, FloorId, 0, 0, 0, 0, userId);

    Assert.Equal(requestId, request.Id);
    Assert.Equal(RequestDescription, request.Description);
    Assert.Equal(UserName, request.UserName);
    Assert.Equal(UserPhoneNumber, request.UserPhoneNumber);
    Assert.Equal(FloorId, request.FloorId);
    Assert.Equal(userId, request.UserId);
  }

  [Fact]
  public void SurveillanceRequest_ShouldAcceptRequest()
  {
    var requestId = new RequestId(Guid.NewGuid());
    var userId = new UserId(Guid.NewGuid().ToString());

    var RequestDescription = new RequestDescription("Description");
    var UserName = new UserName("UserName");
    var UserPhoneNumber = new UserPhoneNumber("UserPhoneNumber");
    var FloorId = new FloorId(Guid.NewGuid().ToString());


    var request = new SurveillanceRequest(requestId, RequestDescription, UserName, UserPhoneNumber, FloorId, 0, 0, 0, 0, userId);

    request.ChangeState(RequestStateEnum.Accepted);

    Assert.Equal(RequestStateEnum.Accepted, request.State.State);
  }

  [Fact]
  public void SurveillanceRequest_ShouldRejectRequest()
  {
    var requestId = new RequestId(Guid.NewGuid());
    var userId = new UserId(Guid.NewGuid().ToString());

    var RequestDescription = new RequestDescription("Description");
    var UserName = new UserName("UserName");
    var UserPhoneNumber = new UserPhoneNumber("UserPhoneNumber");
    var FloorId = new FloorId(Guid.NewGuid().ToString());

    var request = new SurveillanceRequest(requestId, RequestDescription, UserName, UserPhoneNumber, FloorId, 0, 0, 0, 0, userId);

    request.ChangeState(RequestStateEnum.Rejected);

    Assert.Equal(RequestStateEnum.Rejected, request.State.State);
  }

  [Fact]
  public void SurveillanceRequest_ShouldExecuteRequest()
  {
    var requestId = new RequestId(Guid.NewGuid());
    var userId = new UserId(Guid.NewGuid().ToString());

    var RequestDescription = new RequestDescription("Description");
    var UserName = new UserName("UserName");
    var UserPhoneNumber = new UserPhoneNumber("UserPhoneNumber");
    var FloorId = new FloorId(Guid.NewGuid().ToString());

    var request = new SurveillanceRequest(requestId, RequestDescription, UserName, UserPhoneNumber, FloorId, 0, 0, 0, 0, userId);

    request.ChangeState(RequestStateEnum.Executed);

    Assert.Equal(RequestStateEnum.Executed, request.State.State);
  }

  [Fact]
  public void SurveillanceRequest_ShouldBePending()
  {
    var requestId = new RequestId(Guid.NewGuid());
    var userId = new UserId(Guid.NewGuid().ToString());

    var RequestDescription = new RequestDescription("Description");
    var UserName = new UserName("UserName");
    var UserPhoneNumber = new UserPhoneNumber("UserPhoneNumber");
    var FloorId = new FloorId(Guid.NewGuid().ToString());

    var request = new SurveillanceRequest(requestId, RequestDescription, UserName, UserPhoneNumber, FloorId, 0, 0, 0, 0, userId);

    Assert.Equal(RequestStateEnum.Pending, request.State.State);
  }
}
