using System;
using MDTasks.Domain.Floor;
using MDTasks.Domain.Task;
using MDTasks.Domain.User;

namespace MDTasks.Domain.Request.Tests;

public class SurveillanceRequestTest
{
  [Fact]
  public void Request_shouldCreateSurveillanceRequestProperly()
  {
    // Arrange
    var userName = new UserName("John");
    var userPhoneNumber = new UserPhoneNumber("123456789");
    var floorId = new FloorId("1");
    var userId = new UserId("1");
    var requestId = new RequestId(Guid.NewGuid());
    var requestDescription = new RequestDescription("Surveillance request description");
    var request = new SurveillanceRequest(requestId, requestDescription, userName, userPhoneNumber, floorId, 1, 1, 2, 2, userId);

    // Act
    var requestType = request.GetType();

    // Assert
    Assert.Equal(requestType, typeof(SurveillanceRequest));

    Assert.Equal(request.Id, requestId);
    Assert.Equal(request.Description, requestDescription);
    Assert.Equal(request.UserName, userName);
    Assert.Equal(request.UserPhoneNumber, userPhoneNumber);
    Assert.Equal(request.FloorId, floorId);
    Assert.Equal(request.StartCoordinateX, 1);
    Assert.Equal(request.StartCoordinateY, 1);
    Assert.Equal(request.EndCoordinateX, 2);
    Assert.Equal(request.EndCoordinateY, 2);
    Assert.Equal(request.UserId, userId);
  }

  [Fact]
  public void SurveillanceRequest_ChangeDescription_ShouldChangeDescription()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var requestDescription = new RequestDescription("Surveillance request description");
    var userName = new UserName("John");
    var userPhoneNumber = new UserPhoneNumber("123456789");
    var floorId = new FloorId("1");
    var userId = new UserId("1");
    var request = new SurveillanceRequest(requestId, requestDescription, userName, userPhoneNumber, floorId, 1, 1, 2, 2, userId);

    // Act
    var newRequestDescription = new RequestDescription("New surveillance request description");
    request.ChangeDescription(newRequestDescription);

    // Assert
    Assert.Equal(request.Description, newRequestDescription);
  }

  [Fact]
  public void SurveillanceRequest_ChangeUserName_ShouldChangeUserName()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var requestDescription = new RequestDescription("Surveillance request description");
    var userName = new UserName("John");
    var userPhoneNumber = new UserPhoneNumber("123456789");
    var floorId = new FloorId("1");
    var userId = new UserId("1");
    var request = new SurveillanceRequest(requestId, requestDescription, userName, userPhoneNumber, floorId, 1, 1, 2, 2, userId);

    // Act
    var newUserName = new UserName("New surveillance request description");
    request.ChangeUserName(newUserName);

    // Assert
    Assert.Equal(request.UserName, newUserName);
  }

  [Fact]
  public void SurveillanceRequest_ChangeUserName_ShouldUserName()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var requestDescription = new RequestDescription("Surveillance request description");
    var userName = new UserName("John");
    var userPhoneNumber = new UserPhoneNumber("123456789");
    var floorId = new FloorId("1");
    var userId = new UserId("1");
    var request = new SurveillanceRequest(requestId, requestDescription, userName, userPhoneNumber, floorId, 1, 1, 2, 2, userId);

    // Act
    var newUserName = new UserName("New surveillance request description");
    request.ChangeUserName(newUserName);

    // Assert
    Assert.Equal(request.UserName, newUserName);
  }

  [Fact]
  public void SurveillanceRequest_ChangeTargetFloor_ShouldChangeFloor()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var requestDescription = new RequestDescription("Surveillance request description");
    var userName = new UserName("John");
    var userPhoneNumber = new UserPhoneNumber("123456789");
    var floorId = new FloorId("1");
    var userId = new UserId("1");
    var request = new SurveillanceRequest(requestId, requestDescription, userName, userPhoneNumber, floorId, 1, 1, 2, 2, userId);

    // Act
    var newFloorId = new FloorId("New surveillance request description");
    request.ChangeTargetFloor(newFloorId);

    // Assert
    Assert.Equal(request.FloorId, newFloorId);
  }

  [Fact]
  public void SurveillanceRequest_ChangeState_ShouldChangeState()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var requestDescription = new RequestDescription("Surveillance request description");
    var userName = new UserName("John");
    var userPhoneNumber = new UserPhoneNumber("123456789");
    var floorId = new FloorId("1");
    var userId = new UserId("1");
    var request = new SurveillanceRequest(requestId, requestDescription, userName, userPhoneNumber, floorId, 1, 1, 2, 2, userId);

    // Act
    var newState = RequestStateEnum.Accepted;
    request.ChangeState(newState);

    // Assert
    Assert.Equal(request.State.State, newState);
  }

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
