using DDDSample1.Domain.DeviceModel;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;


namespace tests;

public class RequestTest
{

  [Fact]
  public void EnsureRequestConstructorWorksCorrectly()
  {
    // Arrange
    RequestState state = new("Pending");
    DeviceModelCode deviceModelCode = new("Code1");
    DeviceModelName deviceModelName = new("Name1");
    DeviceModel deviceModel = new(deviceModelCode, deviceModelName);
    User user = new("john", "doe");


    // Act
    Request request = new(state, deviceModel.Id, user.Id);

    // Assert
    Assert.Equal(state, request.State);
    Assert.Equal(deviceModel.Id, request.DeviceModelId);
    Assert.Equal(user.Id, request.UserId);
    Assert.True(request.Active);

  }

  [Fact]
  public void EnsureChangeStateWorksCorrectly()
  {
    // Arrange
    RequestState state = new("Pending");
    DeviceModelCode deviceModelCode = new("Code1");
    DeviceModelName deviceModelName = new("Name1");
    DeviceModel deviceModel = new(deviceModelCode, deviceModelName);
    User user = new("john", "doe");

    Request request = new(state, deviceModel.Id, user.Id);

    RequestState newState = new("Completed");

    // Act
    request.ChangeState(newState);

    // Assert
    Assert.Equal(newState, request.State);
  }

  [Fact]
  public void EnsureToggleActiveWorksCorrectly()
  {
    // Arrange
    RequestState state = new("Pending");
    DeviceModelCode deviceModelCode = new("Code1");
    DeviceModelName deviceModelName = new("Name1");
    DeviceModel deviceModel = new(deviceModelCode, deviceModelName);
    User user = new("john", "doe");

    Request request = new(state, deviceModel.Id, user.Id);

    // Act
    bool newActiveState = request.ToggleActive();

    // Assert
    Assert.False(newActiveState);
    Assert.False(request.Active);
  }


}