using Xunit;
using System;

namespace MDTasks.Domain.DeviceModel.Tests;

public class DeviceModelIdTests
{
  [Fact]
  public void DeviceModelId_Constructor_WithGuid_ShouldSetGuidValue()
  {
    var guid = Guid.NewGuid();

    var deviceModelId = new DeviceModelId(guid);

    Assert.Equal(guid.ToString(), deviceModelId.Value);
  }

  [Fact]
  public void DeviceModelId_Constructor_WithString_ShouldSetGuidValue()
  {
    var guidString = Guid.NewGuid().ToString();

    var deviceModelId = new DeviceModelId(guidString);

    Assert.Equal(Guid.Parse(guidString).ToString(), deviceModelId.Value);
  }

  [Fact]
  public void DeviceModelId_Constructor_WithoutArguments_ShouldGenerateNewGuid()
  {
    var deviceModelId = new DeviceModelId();

    Assert.NotEqual("", deviceModelId.Value);
  }
}
