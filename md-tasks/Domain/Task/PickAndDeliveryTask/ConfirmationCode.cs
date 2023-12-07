using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tasks;

namespace DDDSample1.Domain.Categories
{
  public class ConfirmationCode : IValueObject<TaskId>
  {

    public string code { get; private set; }

    private ConfirmationCode()
    {
      this.code = "Pending";
    }

    public ConfirmationCode(string state)
    {
      this.code = code;
    }
  }
}