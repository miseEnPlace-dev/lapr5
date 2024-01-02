using System;
using MDTasks.Domain.Floor;
using MDTasks.Domain.Room;
using MDTasks.Domain.User;

namespace MDTasks.Domain.Request.Tests;

public class PickAndDeliveryRequestTest
{
    [Fact]
    public void PickAndDeliveryRequest_ShouldSetPropertiesCorrectly()
    {
        var requestId = new RequestId(Guid.NewGuid());
        var userId = new UserId(Guid.NewGuid().ToString());

        var RequestDescription = new RequestDescription("Description");
        var UserNamePick = new UserName("Pick Guy");
        var UserNameDelivery = new UserName("Pick Guy");
        var UserPhoneNumberPick = new UserPhoneNumber("919123456");
        var UserPhoneNumberDelivery = new UserPhoneNumber("919123456");
        var RoomIdPick = new RoomId(Guid.NewGuid().ToString());
        var RoomIdDelivery = new RoomId(Guid.NewGuid().ToString());
        var confirmationCode = new ConfirmationCode("123456");


        var request = new PickAndDeliveryRequest(requestId, RequestDescription, UserNamePick, UserNameDelivery, UserPhoneNumberPick, UserPhoneNumberDelivery, RoomIdPick, RoomIdDelivery, confirmationCode, 0, 0, 0, 0, "a1", "a2", userId);

        Assert.Equal(requestId, request.Id);
        Assert.Equal(RequestDescription, request.Description);
        Assert.Equal(UserNamePick, request.PickupUserName);
        Assert.Equal(UserNameDelivery, request.DeliveryUserName);
        Assert.Equal(UserPhoneNumberPick, request.PickupUserPhoneNumber);
        Assert.Equal(UserPhoneNumberDelivery, request.DeliveryUserPhoneNumber);
        Assert.Equal(RoomIdPick, request.PickupRoomId);
        Assert.Equal(RoomIdDelivery, request.DeliveryRoomId);
        Assert.Equal(confirmationCode, request.ConfirmationCode);
        Assert.Equal("a1", request.StartFloorCode);
        Assert.Equal("a2", request.EndFloorCode);
        Assert.Equal(userId, request.UserId);
    }

    [Fact]
    public void PickAndDeliveryRequest_ShouldAcceptRequest()
    {
        var requestId = new RequestId(Guid.NewGuid());
        var userId = new UserId(Guid.NewGuid().ToString());

        var RequestDescription = new RequestDescription("Description");
        var UserNamePick = new UserName("Pick Guy");
        var UserNameDelivery = new UserName("Pick Guy");
        var UserPhoneNumberPick = new UserPhoneNumber("919123456");
        var UserPhoneNumberDelivery = new UserPhoneNumber("919123456");
        var RoomIdPick = new RoomId(Guid.NewGuid().ToString());
        var RoomIdDelivery = new RoomId(Guid.NewGuid().ToString());
        var confirmationCode = new ConfirmationCode("123456");


        var request = new PickAndDeliveryRequest(requestId, RequestDescription, UserNamePick, UserNameDelivery, UserPhoneNumberPick, UserPhoneNumberDelivery, RoomIdPick, RoomIdDelivery, confirmationCode, 0, 0, 0, 0, "a1", "a2", userId);

        request.ChangeState(RequestStateEnum.Accepted);

        Assert.Equal(RequestStateEnum.Accepted, request.State.State);
    }

    [Fact]
    public void PickAndDeliveryRequest_ShouldRejectRequest()
    {
        var requestId = new RequestId(Guid.NewGuid());
        var userId = new UserId(Guid.NewGuid().ToString());

        var RequestDescription = new RequestDescription("Description");
        var UserNamePick = new UserName("Pick Guy");
        var UserNameDelivery = new UserName("Pick Guy");
        var UserPhoneNumberPick = new UserPhoneNumber("919123456");
        var UserPhoneNumberDelivery = new UserPhoneNumber("919123456");
        var RoomIdPick = new RoomId(Guid.NewGuid().ToString());
        var RoomIdDelivery = new RoomId(Guid.NewGuid().ToString());
        var confirmationCode = new ConfirmationCode("123456");


        var request = new PickAndDeliveryRequest(requestId, RequestDescription, UserNamePick, UserNameDelivery, UserPhoneNumberPick, UserPhoneNumberDelivery, RoomIdPick, RoomIdDelivery, confirmationCode, 0, 0, 0, 0, "a1", "a2", userId);

        request.ChangeState(RequestStateEnum.Rejected);

        Assert.Equal(RequestStateEnum.Rejected, request.State.State);
    }

    [Fact]
    public void PickAndDeliveryRequest_ShouldExecuteRequest()
    {
        var requestId = new RequestId(Guid.NewGuid());
        var userId = new UserId(Guid.NewGuid().ToString());

        var RequestDescription = new RequestDescription("Description");
        var UserNamePick = new UserName("Pick Guy");
        var UserNameDelivery = new UserName("Pick Guy");
        var UserPhoneNumberPick = new UserPhoneNumber("919123456");
        var UserPhoneNumberDelivery = new UserPhoneNumber("919123456");
        var RoomIdPick = new RoomId(Guid.NewGuid().ToString());
        var RoomIdDelivery = new RoomId(Guid.NewGuid().ToString());
        var confirmationCode = new ConfirmationCode("123456");


        var request = new PickAndDeliveryRequest(requestId, RequestDescription, UserNamePick, UserNameDelivery, UserPhoneNumberPick, UserPhoneNumberDelivery, RoomIdPick, RoomIdDelivery, confirmationCode, 0, 0, 0, 0, "a1", "a2", userId);

        request.ChangeState(RequestStateEnum.Executed);

        Assert.Equal(RequestStateEnum.Executed, request.State.State);
    }

    [Fact]
    public void PickAndDeliveryRequest_ShouldBePending()
    {
        var requestId = new RequestId(Guid.NewGuid());
        var userId = new UserId(Guid.NewGuid().ToString());

        var RequestDescription = new RequestDescription("Description");
        var UserNamePick = new UserName("Pick Guy");
        var UserNameDelivery = new UserName("Pick Guy");
        var UserPhoneNumberPick = new UserPhoneNumber("919123456");
        var UserPhoneNumberDelivery = new UserPhoneNumber("919123456");
        var RoomIdPick = new RoomId(Guid.NewGuid().ToString());
        var RoomIdDelivery = new RoomId(Guid.NewGuid().ToString());
        var confirmationCode = new ConfirmationCode("123456");


        var request = new PickAndDeliveryRequest(requestId, RequestDescription, UserNamePick, UserNameDelivery, UserPhoneNumberPick, UserPhoneNumberDelivery, RoomIdPick, RoomIdDelivery, confirmationCode, 0, 0, 0, 0, "a1", "a2", userId);

        Assert.Equal(RequestStateEnum.Pending, request.State.State);
    }
}
