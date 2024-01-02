// using MDTasks.Domain.DeviceModel;
// using MDTasks.Domain.DeviceTasks;
// using MDTasks.Domain.DeviceTasks.PickAndDeliveryTask;
// using MDTasks.Domain.Requests;
// using MDTasks.Domain.Room;
// using MDTasks.Domain.Shared;
// using MDTasks.Domain.User;


// namespace tests;

// public class RequestTest
// {

//   [Fact]
//   public void EnsureRequestConstructorWorksCorrectly()
//   {
//     // Arrange
//     RequestState state = new("Pending");
//     DeviceModelCode deviceModelCode = new("Code1");
//     DeviceModelName deviceModelName = new("Name1");
//     DeviceModel deviceModel = new(deviceModelCode, deviceModelName);
//     UserEmail userEmail = new("email@email.com");
//     User user = new("john", "doe", userEmail);
//     Room room = new("Room1");

//     PickAndDeliveryDescription pickAndDeliveryDescription = new("Description1");

//     PickAndDeliveryTask pickAndDeliveryTask = new(pickAndDeliveryDescription, user.UserEmail, user.UserEmail, room.Id, room.Id);

//     // Act
//     Request request = new(state, deviceModel.DeviceModelCode, user.UserEmail, pickAndDeliveryTask);

//     // Assert
//     Assert.Equal(state, request.State);
//     Assert.Equal(deviceModel.DeviceModelCode, request.DeviceModelCode);
//     Assert.Equal(user.UserEmail, request.UserEmail);
//     Assert.True(request.Active);
//     Assert.Equal(pickAndDeliveryTask, request.DeviceTask);

//   }

//   [Fact]
//   public void EnsureChangeStateWorksCorrectly()
//   {
//     // Arrange
//     RequestState state = new("Pending");
//     DeviceModelCode deviceModelCode = new("Code1");
//     DeviceModelName deviceModelName = new("Name1");
//     DeviceModel deviceModel = new(deviceModelCode, deviceModelName);
//     UserEmail userEmail = new("email@email.com");
//     User user = new("john", "doe", userEmail);
//     Room room = new("Room1");

//     PickAndDeliveryDescription pickAndDeliveryDescription = new("Description1");

//     PickAndDeliveryTask pickAndDeliveryTask = new(pickAndDeliveryDescription, user.UserEmail, user.UserEmail, room.Id, room.Id);

//     Request request = new(state, deviceModel.DeviceModelCode, user.UserEmail, pickAndDeliveryTask);

//     RequestState newState = new("Completed");

//     // Act
//     request.ChangeState(newState);

//     // Assert
//     Assert.Equal(newState, request.State);
//   }

//   [Fact]
//   public void EnsureToggleActiveWorksCorrectly()
//   {
//     // Arrange
//     RequestState state = new("Pending");
//     DeviceModelCode deviceModelCode = new("Code1");
//     DeviceModelName deviceModelName = new("Name1");
//     DeviceModel deviceModel = new(deviceModelCode, deviceModelName);
//     UserEmail userEmail = new("email@email.com");
//     User user = new("john", "doe", userEmail);
//     Room room = new("Room1");

//     PickAndDeliveryDescription pickAndDeliveryDescription = new("Description1");

//     PickAndDeliveryTask pickAndDeliveryTask = new(pickAndDeliveryDescription, user.UserEmail, user.UserEmail, room.Id, room.Id);

//     Request request = new(state, deviceModel.DeviceModelCode, user.UserEmail, pickAndDeliveryTask);

//     // Act
//     bool newActiveState = request.ToggleActive();

//     // Assert
//     Assert.False(newActiveState);
//     Assert.False(request.Active);
//   }


// }
