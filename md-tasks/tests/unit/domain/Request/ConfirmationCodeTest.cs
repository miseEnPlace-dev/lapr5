using System;
using MDTasks.Domain.Shared;

namespace MDTasks.Domain.Request.Tests;

public class ConfirmationCodeTest
{
    [Fact]
    public void ConfirmationCode_ShouldSetPropertiesCorrectly()
    {
        var code = "123456";
        var confirmationCode = new ConfirmationCode(code);

        Assert.Equal(code, confirmationCode.Code);
    }

    [Fact]
    public void ConfirmationCode_ShouldThrowException_WhenCodeBiggerThan6Char()
    {
        var code = "TooLongCode";
        Assert.Throws<BusinessRuleValidationException>(() => new ConfirmationCode(code));
    }

    [Fact]
    public void ConfirmationCode_ShouldThrowException_WhenCodeSmallerThan4Char()
    {
        var code = "1";
        Assert.Throws<BusinessRuleValidationException>(() => new ConfirmationCode(code));
    }

    [Fact]
    public void ConfirmationCode_ShouldThrowException_WhenCodeEmpty()
    {
        var code = "";
        Assert.Throws<BusinessRuleValidationException>(() => new ConfirmationCode(code));
    }
}
