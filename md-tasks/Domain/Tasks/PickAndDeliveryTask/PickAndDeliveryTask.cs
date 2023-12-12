using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Tasks.PickAndDeliveryTask
{
    public class PickAndDeliveryTask
    {
        public PickAndDeliveryDescription PickAndDeliveryDescription { get; private set; }
        public ConfirmationCode ConfirmationCode { get; private set; }

        public bool Active { get; private set; }

        private PickAndDeliveryTask()
        {
            this.Active = true;
        }

        public PickAndDeliveryTask(PickAndDeliveryDescription PickAndDeliveryDescription)
        {
            this.PickAndDeliveryDescription = PickAndDeliveryDescription;
            this.ConfirmationCode = new ConfirmationCode("Pending");
            this.Active = true;
        }

        public void ChangeDescription(PickAndDeliveryDescription PickAndDeliveryDescription)
        {
            if (!this.Active)
            {
                throw new BusinessRuleValidationException("Task is not active.");
            }
            this.PickAndDeliveryDescription = PickAndDeliveryDescription;
        }

        public void ChangeConfirmationCode(ConfirmationCode ConfirmationCode)
        {
            if (!this.Active)
            {
                throw new BusinessRuleValidationException("Task is not active.");
            }
            this.ConfirmationCode = ConfirmationCode;
        }

        public void Deactivate()
        {
            this.Active = false;
        }
    }
}
