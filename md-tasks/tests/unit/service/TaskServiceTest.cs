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

namespace MDTasks.tests.unit.service;

public class TaskServiceTests
{
  [Fact]
  public async Task GetById_WithExistingTask_ReturnsTaskDTO()
  {
    var taskId = new TaskId(new Guid());
    var requestId = new RequestId(new Guid());
    var task = new DeviceTask(requestId, "Device123");
    var taskRepoMock = new Mock<ITaskRepository>();
    var surveillanceRequestRepoMock = new Mock<ISurveillanceRequestRepository>();
    var pickAndDeliveryRequestRepoMock = new Mock<IPickAndDeliveryRequestRepository>();
    var unitOfWorkMock = new Mock<IUnitOfWork>();

    taskRepoMock.Setup(repo => repo.GetByIdAsync(taskId)).ReturnsAsync(task);
    surveillanceRequestRepoMock.Setup(repo => repo.GetByIdAsync(requestId)).ReturnsAsync(new SurveillanceRequest(
      requestId,
      new RequestDescription("description"),
      new UserName("username"),
      new UserPhoneNumber("123456789"),
      new FloorId("1"),
      0, 0, 0, 0, new UserId("1")
    ));
    pickAndDeliveryRequestRepoMock.Setup(repo => repo.GetByIdAsync(requestId)).ReturnsAsync((PickAndDeliveryRequest)null);

    var taskService = new TaskService(unitOfWorkMock.Object, taskRepoMock.Object, surveillanceRequestRepoMock.Object, pickAndDeliveryRequestRepoMock.Object);

    var result = await taskService.GetById(taskId);

    Assert.NotNull(result);
    Assert.IsType<SurveillanceTaskDTO>(result);
  }

  [Fact]
  public async Task GetById_WithNonExistingTask_ReturnsNull()
  {
    var taskId = new TaskId(new Guid());
    var taskRepoMock = new Mock<ITaskRepository>();
    var surveillanceRequestRepoMock = new Mock<ISurveillanceRequestRepository>();
    var unitOfWorkMock = new Mock<IUnitOfWork>();
    var pickAndDeliveryRequestRepoMock = new Mock<IPickAndDeliveryRequestRepository>();

    taskRepoMock.Setup(repo => repo.GetByIdAsync(taskId)).ReturnsAsync((DeviceTask)null);

    var taskService = new TaskService(unitOfWorkMock.Object, taskRepoMock.Object, surveillanceRequestRepoMock.Object, pickAndDeliveryRequestRepoMock.Object);

    var result = await taskService.GetById(taskId);

    Assert.Null(result);
  }
}
