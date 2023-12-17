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
    UserEmail userEmail = new("email@email.com");
    User user = new("john", "doe", userEmail);


    // Act
    Request request = new(state, deviceModel.DeviceModelCode, user.UserEmail);

    // Assert
    Assert.Equal(state, request.State);
    Assert.Equal(deviceModel.DeviceModelCode, request.DeviceModelCode);
    Assert.Equal(user.UserEmail, request.UserEmail);
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
    UserEmail userEmail = new("email@email.com");
    User user = new("john", "doe", userEmail);

    Request request = new(state, deviceModel.DeviceModelCode, user.UserEmail);

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
    UserEmail userEmail = new("email@email.com");
    User user = new("john", "doe", userEmail);

    Request request = new(state, deviceModel.DeviceModelCode, user.UserEmail);

    // Act
    bool newActiveState = request.ToggleActive();

    // Assert
    Assert.False(newActiveState);
    Assert.False(request.Active);
  }


}