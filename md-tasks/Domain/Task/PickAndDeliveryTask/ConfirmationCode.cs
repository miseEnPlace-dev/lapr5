using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Task.PickAndDeliveryTask
{
  public class ConfirmationCode : ValueObject
  {

    public string Code { get; private set; }

    private ConfirmationCode()
    {
      Code = "Pending";
    }

    public ConfirmationCode(string code)
    {
      Code = code;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Code;
    }
  }
}
