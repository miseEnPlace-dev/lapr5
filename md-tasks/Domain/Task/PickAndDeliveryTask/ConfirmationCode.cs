using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Task.PickAndDeliveryTask
{
  public class ConfirmationCode : IValueObject<TaskId>
  {

    public string Code { get; private set; }

    private ConfirmationCode()
    {
      Code = "Pending";
    }

    public ConfirmationCode(string Code)
    {
      this.Code = Code;
    }
  }
}