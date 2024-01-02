using Moq;
using System.Threading.Tasks;
using MDTasks.DTO;
using MDTasks.Domain.Shared;
using System;
using MDTasks.Domain.User;
using MDTasks.Domain.Floor;
using MDTasks.Infrastructure;
using MDTasks.Domain.Task;
using MDTasks.Domain.Request;
using MDTasks.Services;
using System.Collections.Generic;

namespace MDTasks.tests.unit.service;

public class RequestServiceTests
{
  [Fact]
  public async Task GetRequestByState_WithExistingSVRequest_ReturnsListRequestDTO()
  {
    var taskId = new TaskId(new Guid());
    var requestId = new RequestId(new Guid());
    var task = new DeviceTask(requestId, "Device123");
    var taskRepoMock = new Mock<ITaskRepository>();
    var surveillanceRequestRepoMock = new Mock<ISurveillanceRequestRepository>();
    var pickAndDeliveryRequestRepoMock = new Mock<IPickAndDeliveryRequestRepository>();
    var unitOfWorkMock = new Mock<IUnitOfWork>();

    var surveillanceRequest = new SurveillanceRequest(
      requestId,
      new RequestDescription("description"),
      new UserName("username"),
      new UserPhoneNumber("123456789"),
      new FloorId("1"),
      0, 0, 0, 0, new UserId("1")
    );
    var svList = new List<SurveillanceRequest>
    {
        surveillanceRequest
    };

    surveillanceRequestRepoMock.Setup(repo => repo.GetRequestsByState(new RequestState(RequestStateEnum.Pending), -1, -1)).ReturnsAsync(
      svList
    );
    pickAndDeliveryRequestRepoMock.Setup(repo => repo.GetRequestsByState(new RequestState(RequestStateEnum.Pending), -1, -1)).ReturnsAsync(new List<PickAndDeliveryRequest>());

    surveillanceRequestRepoMock.Setup(repo => repo.GetByIdAsync(requestId)).ReturnsAsync(
      surveillanceRequest
    );

    pickAndDeliveryRequestRepoMock.Setup(repo => repo.GetByIdAsync(requestId)).ReturnsAsync(null as PickAndDeliveryRequest);

    var requestService = new RequestService(unitOfWorkMock.Object, surveillanceRequestRepoMock.Object, pickAndDeliveryRequestRepoMock.Object, taskRepoMock.Object);
    var result = await requestService.GetRequestsByState(new RequestState(RequestStateEnum.Pending), -1, -1);

    Assert.NotNull(result);
    Assert.IsType<PaginationDTO<RequestDTO>>(result);
    Assert.Single(result.data);
    Assert.Equal(requestId.Value, result.data[0].Id);
  }

  [Fact]
  public async Task GetRequestByState_WithNonExistingRequest_ReturnsEmptyList()
  {
    var taskRepoMock = new Mock<ITaskRepository>();
    var surveillanceRequestRepoMock = new Mock<ISurveillanceRequestRepository>();
    var pickAndDeliveryRequestRepoMock = new Mock<IPickAndDeliveryRequestRepository>();
    var unitOfWorkMock = new Mock<IUnitOfWork>();

    surveillanceRequestRepoMock.Setup(repo => repo.GetRequestsByState(new RequestState(RequestStateEnum.Pending), -1, -1)).ReturnsAsync(new List<SurveillanceRequest>());
    pickAndDeliveryRequestRepoMock.Setup(repo => repo.GetRequestsByState(new RequestState(RequestStateEnum.Pending), -1, -1)).ReturnsAsync(new List<PickAndDeliveryRequest>());

    var requestService = new RequestService(unitOfWorkMock.Object, surveillanceRequestRepoMock.Object, pickAndDeliveryRequestRepoMock.Object, taskRepoMock.Object);
    var result = await requestService.GetRequestsByState(new RequestState(RequestStateEnum.Pending), -1, -1);

    Assert.NotNull(result);
    Assert.IsType<PaginationDTO<RequestDTO>>(result);
    Assert.Empty(result.data);
  }

  [Fact]
  public async Task GetRequestByUserId_WithExistingSVRequest_ReturnsListRequestDTO()
  {
    var userId = new UserId(new Guid().ToString());
    var taskId = new TaskId(new Guid());
    var requestId = new RequestId(new Guid());
    var task = new DeviceTask(requestId, "Device123");
    var taskRepoMock = new Mock<ITaskRepository>();
    var surveillanceRequestRepoMock = new Mock<ISurveillanceRequestRepository>();
    var pickAndDeliveryRequestRepoMock = new Mock<IPickAndDeliveryRequestRepository>();
    var unitOfWorkMock = new Mock<IUnitOfWork>();

    var surveillanceRequest = new SurveillanceRequest(
      requestId,
      new RequestDescription("description"),
      new UserName("username"),
      new UserPhoneNumber("123456789"),
      new FloorId("1"),
      0, 0, 0, 0, new UserId("1")
    );
    var svList = new List<SurveillanceRequest>
    {
        surveillanceRequest
    };

    surveillanceRequestRepoMock.Setup(repo => repo.GetRequestsByUserIdAsync(userId, -1, -1)).ReturnsAsync(
      svList
    );
    pickAndDeliveryRequestRepoMock.Setup(repo => repo.GetRequestsByUserIdAsync(userId, -1, -1)).ReturnsAsync(new List<PickAndDeliveryRequest>());

    surveillanceRequestRepoMock.Setup(repo => repo.GetByIdAsync(requestId)).ReturnsAsync(
      surveillanceRequest
    );

    pickAndDeliveryRequestRepoMock.Setup(repo => repo.GetByIdAsync(requestId)).ReturnsAsync(null as PickAndDeliveryRequest);

    var requestService = new RequestService(unitOfWorkMock.Object, surveillanceRequestRepoMock.Object, pickAndDeliveryRequestRepoMock.Object, taskRepoMock.Object);
    var result = await requestService.GetRequestsByUserIdAsync(userId, -1, -1);

    Assert.NotNull(result);
    Assert.IsType<PaginationDTO<RequestDTO>>(result);
    Assert.Single(result.data);
    Assert.Equal(requestId.Value, result.data[0].Id);
  }

  [Fact]
  public async Task GetRequestByUserId_WithNonExistingRequest_ReturnsEmptyList()
  {
    var userId = new UserId(new Guid().ToString());
    var taskRepoMock = new Mock<ITaskRepository>();
    var surveillanceRequestRepoMock = new Mock<ISurveillanceRequestRepository>();
    var pickAndDeliveryRequestRepoMock = new Mock<IPickAndDeliveryRequestRepository>();
    var unitOfWorkMock = new Mock<IUnitOfWork>();

    surveillanceRequestRepoMock.Setup(repo => repo.GetRequestsByUserIdAsync(userId, -1, -1)).ReturnsAsync(new List<SurveillanceRequest>());
    pickAndDeliveryRequestRepoMock.Setup(repo => repo.GetRequestsByUserIdAsync(userId, -1, -1)).ReturnsAsync(new List<PickAndDeliveryRequest>());

    var requestService = new RequestService(unitOfWorkMock.Object, surveillanceRequestRepoMock.Object, pickAndDeliveryRequestRepoMock.Object, taskRepoMock.Object);
    var result = await requestService.GetRequestsByUserIdAsync(userId, -1, -1);

    Assert.NotNull(result);
    Assert.IsType<PaginationDTO<RequestDTO>>(result);
    Assert.Empty(result.data);
  }

}
