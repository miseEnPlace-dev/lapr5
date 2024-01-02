using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.DeviceModel.Tests
{
  public class DeviceModelCodeTests
  {
    [Fact]
    public void DeviceModelCode_Constructor_WithValidCode_ShouldSetCodeProperty()
    {
      var code = "ABC123";

      var deviceModelCode = new DeviceModelCode(code);

      Assert.Equal(code, deviceModelCode.Code);
    }

    [Fact]
    public void DeviceModelCode_Constructor_WithInvalidCode_ShouldThrowBusinessRuleValidationException()
    {
      var invalidCode = "ThisCodeIsTooLongAndShouldThrowAnException";

      Assert.Throws<BusinessRuleValidationException>(() => new DeviceModelCode(invalidCode));
    }

    [Fact]
    public void DeviceModelCode_ChangeCode_ShouldUpdateCodeProperty()
    {
      var deviceModelCode = new DeviceModelCode("ABC123");
      var newCode = "XYZ789";

      deviceModelCode.ChangeCode(newCode);

      Assert.Equal(newCode, deviceModelCode.Code);
    }

    [Fact]
    public void DeviceModelCode_AsString_ShouldReturnCodeAsString()
    {
      var code = "ABC123";
      var deviceModelCode = new DeviceModelCode(code);

      var codeAsString = deviceModelCode.AsString();

      Assert.Equal(code, codeAsString);
    }
  }
}
