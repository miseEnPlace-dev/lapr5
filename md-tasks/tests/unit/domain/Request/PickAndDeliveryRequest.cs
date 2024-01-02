using System;
using MDTasks.Domain.Floor;
using MDTasks.Domain.Room;
using MDTasks.Domain.Task;
using MDTasks.Domain.User;

namespace MDTasks.Domain.Request.Tests;

public class PickAndDeliveryRequestTests
{
  [Fact]
  public void PickAndDeliveryRequest_Constructor_ShouldCreateObjectProperly()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var description = new RequestDescription("Pick and delivery request description");
    var confirmationCode = new ConfirmationCode("1234");
    var pickupUserName = new UserName("John");
    var deliveryUserName = new UserName("Jane");
    var pickupUserPhoneNumber = new UserPhoneNumber("123456789");
    var deliveryUserPhoneNumber = new UserPhoneNumber("987654321");
    var pickupRoomId = new RoomId("1");
    var deliveryRoomId = new RoomId("2");
    var startFloorCode = "StartFloorCode";
    var endFloorCode = "EndFloorCode";
    var userId = new UserId("1");

    // Act
    var request = new PickAndDeliveryRequest(requestId, description, pickupUserName, deliveryUserName, pickupUserPhoneNumber, deliveryUserPhoneNumber, pickupRoomId, deliveryRoomId, confirmationCode, 1, 1, 2, 2, startFloorCode, endFloorCode, userId);

    // Assert
    Assert.Equal(requestId, request.Id);
    Assert.Equal(description, request.Description);
    Assert.Equal(confirmationCode, request.ConfirmationCode);
    Assert.Equal(pickupUserName, request.PickupUserName);
    Assert.Equal(deliveryUserName, request.DeliveryUserName);
    Assert.Equal(pickupUserPhoneNumber, request.PickupUserPhoneNumber);
    Assert.Equal(deliveryUserPhoneNumber, request.DeliveryUserPhoneNumber);
    Assert.Equal(pickupRoomId, request.PickupRoomId);
    Assert.Equal(deliveryRoomId, request.DeliveryRoomId);
    Assert.Equal(startFloorCode, request.StartFloorCode);
    Assert.Equal(endFloorCode, request.EndFloorCode);
    Assert.Equal(1, request.StartCoordinateX);
    Assert.Equal(1, request.StartCoordinateY);
    Assert.Equal(2, request.EndCoordinateX);
    Assert.Equal(2, request.EndCoordinateY);
    Assert.Equal(userId, request.UserId);
  }

  [Fact]
  public void PickAndDeliveryRequest_ChangeDescription_ShouldChangeDescription()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var description = new RequestDescription("Pick and delivery request description");
    var confirmationCode = new ConfirmationCode("1234");
    var pickupUserName = new UserName("John");
    var deliveryUserName = new UserName("Jane");
    var pickupUserPhoneNumber = new UserPhoneNumber("123456789");
    var deliveryUserPhoneNumber = new UserPhoneNumber("987654321");
    var pickupRoomId = new RoomId("1");
    var deliveryRoomId = new RoomId("2");
    var startFloorCode = "StartFloorCode";
    var endFloorCode = "EndFloorCode";
    var userId = new UserId("1");
    var request = new PickAndDeliveryRequest(requestId, description, pickupUserName, deliveryUserName, pickupUserPhoneNumber, deliveryUserPhoneNumber, pickupRoomId, deliveryRoomId, confirmationCode, 1, 1, 2, 2, startFloorCode, endFloorCode, userId);

    var newDescription = new RequestDescription("New pick and delivery request description");

    // Act
    request.ChangeDescription(newDescription);

    // Assert
    Assert.Equal(newDescription, request.Description);
  }

  [Fact]
  public void PickAndDeliveryRequest_ChangeConfirmationCode_ShouldChangeConfirmationCode()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var description = new RequestDescription("Pick and delivery request description");
    var confirmationCode = new ConfirmationCode("1234");
    var pickupUserName = new UserName("John");
    var deliveryUserName = new UserName("Jane");
    var pickupUserPhoneNumber = new UserPhoneNumber("123456789");
    var deliveryUserPhoneNumber = new UserPhoneNumber("987654321");
    var pickupRoomId = new RoomId("1");
    var deliveryRoomId = new RoomId("2");
    var startFloorCode = "StartFloorCode";
    var endFloorCode = "EndFloorCode";
    var userId = new UserId("1");
    var request = new PickAndDeliveryRequest(requestId, description, pickupUserName, deliveryUserName, pickupUserPhoneNumber, deliveryUserPhoneNumber, pickupRoomId, deliveryRoomId, confirmationCode, 1, 1, 2, 2, startFloorCode, endFloorCode, userId);

    var newConfirmationCode = new ConfirmationCode("4321");

    // Act
    request.ChangeConfirmationCode(newConfirmationCode);

    // Assert
    Assert.Equal(newConfirmationCode, request.ConfirmationCode);
  }

  [Fact]
  public void PickAndDeliveryRequest_ChangePickupUserName_ShouldChangePickupUserName()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var description = new RequestDescription("Pick and delivery request description");
    var confirmationCode = new ConfirmationCode("1234");
    var pickupUserName = new UserName("John");
    var deliveryUserName = new UserName("Jane");
    var pickupUserPhoneNumber = new UserPhoneNumber("123456789");
    var deliveryUserPhoneNumber = new UserPhoneNumber("987654321");
    var pickupRoomId = new RoomId("1");
    var deliveryRoomId = new RoomId("2");
    var startFloorCode = "StartFloorCode";
    var endFloorCode = "EndFloorCode";
    var userId = new UserId("1");
    var request = new PickAndDeliveryRequest(requestId, description, pickupUserName, deliveryUserName, pickupUserPhoneNumber, deliveryUserPhoneNumber, pickupRoomId, deliveryRoomId, confirmationCode, 1, 1, 2, 2, startFloorCode, endFloorCode, userId);

    var newPickupUserName = new UserName("New pickup user name");

    // Act
    request.ChangePickupUserName(newPickupUserName);

    // Assert
    Assert.Equal(newPickupUserName, request.PickupUserName);
  }

  [Fact]
  public void PickAndDeliveryRequest_ChangeDeliveryUserName_ShouldChangeDeliveryUserName()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var description = new RequestDescription("Pick and delivery request description");
    var confirmationCode = new ConfirmationCode("1234");
    var pickupUserName = new UserName("John");
    var deliveryUserName = new UserName("Jane");
    var pickupUserPhoneNumber = new UserPhoneNumber("123456789");
    var deliveryUserPhoneNumber = new UserPhoneNumber("987654321");
    var pickupRoomId = new RoomId("1");
    var deliveryRoomId = new RoomId("2");
    var startFloorCode = "StartFloorCode";
    var endFloorCode = "EndFloorCode";
    var userId = new UserId("1");
    var request = new PickAndDeliveryRequest(requestId, description, pickupUserName, deliveryUserName, pickupUserPhoneNumber, deliveryUserPhoneNumber, pickupRoomId, deliveryRoomId, confirmationCode, 1, 1, 2, 2, startFloorCode, endFloorCode, userId);

    var newDeliveryUserName = new UserName("New delivery user name");

    // Act
    request.ChangeDeliveryUserName(newDeliveryUserName);

    // Assert
    Assert.Equal(newDeliveryUserName, request.DeliveryUserName);
  }

  [Fact]
  public void PickAndDeliveryRequest_ChangePickupUserPhoneNumber_ShouldChangePickupUserPhoneNumber()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var description = new RequestDescription("Pick and delivery request description");
    var confirmationCode = new ConfirmationCode("1234");
    var pickupUserName = new UserName("John");
    var deliveryUserName = new UserName("Jane");
    var pickupUserPhoneNumber = new UserPhoneNumber("123456789");
    var deliveryUserPhoneNumber = new UserPhoneNumber("987654321");
    var pickupRoomId = new RoomId("1");
    var deliveryRoomId = new RoomId("2");
    var startFloorCode = "StartFloorCode";
    var endFloorCode = "EndFloorCode";
    var userId = new UserId("1");
    var request = new PickAndDeliveryRequest(requestId, description, pickupUserName, deliveryUserName, pickupUserPhoneNumber, deliveryUserPhoneNumber, pickupRoomId, deliveryRoomId, confirmationCode, 1, 1, 2, 2, startFloorCode, endFloorCode, userId);

    var newPickupUserPhoneNumber = new UserPhoneNumber("987654321");

    // Act
    request.ChangePickupUserPhoneNumber(newPickupUserPhoneNumber);

    // Assert
    Assert.Equal(newPickupUserPhoneNumber, request.PickupUserPhoneNumber);
  }

  [Fact]
  public void PickAndDeliveryRequest_ChangeDeliveryUserPhoneNumber_ShouldChangeDeliveryUserPhoneNumber()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var description = new RequestDescription("Pick and delivery request description");
    var confirmationCode = new ConfirmationCode("1234");
    var pickupUserName = new UserName("John");
    var deliveryUserName = new UserName("Jane");
    var pickupUserPhoneNumber = new UserPhoneNumber("123456789");
    var deliveryUserPhoneNumber = new UserPhoneNumber("987654321");
    var pickupRoomId = new RoomId("1");
    var deliveryRoomId = new RoomId("2");
    var startFloorCode = "StartFloorCode";
    var endFloorCode = "EndFloorCode";
    var userId = new UserId("1");
    var request = new PickAndDeliveryRequest(requestId, description, pickupUserName, deliveryUserName, pickupUserPhoneNumber, deliveryUserPhoneNumber, pickupRoomId, deliveryRoomId, confirmationCode, 1, 1, 2, 2, startFloorCode, endFloorCode, userId);

    var newDeliveryUserPhoneNumber = new UserPhoneNumber("123456789");

    // Act
    request.ChangeDeliveryUserPhoneNumber(newDeliveryUserPhoneNumber);

    // Assert
    Assert.Equal(newDeliveryUserPhoneNumber, request.DeliveryUserPhoneNumber);
  }

  [Fact]
  public void PickAndDeliveryRequest_ChangePickupRoomId_ShouldChangePickupRoomId()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var description = new RequestDescription("Pick and delivery request description");
    var confirmationCode = new ConfirmationCode("1234");
    var pickupUserName = new UserName("John");
    var deliveryUserName = new UserName("Jane");
    var pickupUserPhoneNumber = new UserPhoneNumber("123456789");
    var deliveryUserPhoneNumber = new UserPhoneNumber("987654321");
    var pickupRoomId = new RoomId("1");
    var deliveryRoomId = new RoomId("2");
    var startFloorCode = "StartFloorCode";
    var endFloorCode = "EndFloorCode";
    var userId = new UserId("1");
    var request = new PickAndDeliveryRequest(requestId, description, pickupUserName, deliveryUserName, pickupUserPhoneNumber, deliveryUserPhoneNumber, pickupRoomId, deliveryRoomId, confirmationCode, 1, 1, 2, 2, startFloorCode, endFloorCode, userId);

    var newPickupRoomId = new RoomId("3");

    // Act
    request.ChangePickupRoomId(newPickupRoomId);

    // Assert
    Assert.Equal(newPickupRoomId, request.PickupRoomId);
  }

  [Fact]
  public void PickAndDeliveryRequest_ChangeDeliveryRoomId_ShouldChangeDeliveryRoomId()
  {
    // Arrange
    var requestId = new RequestId(Guid.NewGuid());
    var description = new RequestDescription("Pick and delivery request description");
    var confirmationCode = new ConfirmationCode("1234");
    var pickupUserName = new UserName("John");
    var deliveryUserName = new UserName("Jane");
    var pickupUserPhoneNumber = new UserPhoneNumber("123456789");
    var deliveryUserPhoneNumber = new UserPhoneNumber("987654321");
    var pickupRoomId = new RoomId("1");
    var deliveryRoomId = new RoomId("2");
    var startFloorCode = "StartFloorCode";
    var endFloorCode = "EndFloorCode";
    var userId = new UserId("1");
    var request = new PickAndDeliveryRequest(requestId, description, pickupUserName, deliveryUserName, pickupUserPhoneNumber, deliveryUserPhoneNumber, pickupRoomId, deliveryRoomId, confirmationCode, 1, 1, 2, 2, startFloorCode, endFloorCode, userId);

    var newDeliveryRoomId = new RoomId("4");

    // Act
    request.ChangeDeliveryRoomId(newDeliveryRoomId);

    // Assert
    Assert.Equal(newDeliveryRoomId, request.DeliveryRoomId);
  }
}