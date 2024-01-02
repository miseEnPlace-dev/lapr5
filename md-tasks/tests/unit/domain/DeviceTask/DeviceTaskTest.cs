using System;
using DDDSample1.Domain.DeviceTasks;

namespace DDDSample1.Domain.Requests.Tests
{
  public class DeviceTaskTests
  {
    [Fact]
    public void DeviceTask_ShouldSetPropertiesCorrectly()
    {
      var requestId = new RequestId(Guid.NewGuid());
      var deviceId = "Device123";

      var deviceTask = new DeviceTask(requestId, deviceId);

      Assert.Equal(requestId, deviceTask.RequestId);
      Assert.Equal(deviceId, deviceTask.DeviceId);
      Assert.False(deviceTask.IsFinished);
    }

    [Fact]
    public void DeviceTask_ShouldFinishTask()
    {
      var requestId = new RequestId(Guid.NewGuid());
      var deviceId = "Device123";
      var deviceTask = new DeviceTask(requestId, deviceId);

      deviceTask.Finish();

      Assert.True(deviceTask.IsFinished);
    }
  }
}
