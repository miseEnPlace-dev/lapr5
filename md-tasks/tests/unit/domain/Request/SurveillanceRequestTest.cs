using System;
using MDTasks.Domain.Floor;
using MDTasks.Domain.Task;
using MDTasks.Domain.User;

namespace MDTasks.Domain.Request.Tests;

public class Requests
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
}
