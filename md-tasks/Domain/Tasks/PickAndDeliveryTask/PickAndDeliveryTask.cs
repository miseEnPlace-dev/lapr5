using DDDSample1.Domain.Shared;
using DDDSample1.Domain.User;

namespace DDDSample1.Domain.Tasks.PickAndDeliveryTask
{
    public class PickAndDeliveryTask
    {
        public PickAndDeliveryDescription PickAndDeliveryDescription { get; private set; }
        public ConfirmationCode ConfirmationCode { get; private set; }

        public UserId PickupUserId { get; private set; }
        public UserId DeliveryUserId { get; private set; }

        public bool Active { get; private set; }

        private PickAndDeliveryTask()
        {
            Active = true;
        }

        public PickAndDeliveryTask(PickAndDeliveryDescription PickAndDeliveryDescription, UserId PickupUserId, UserId DeliveryUserId)
        {
            this.PickAndDeliveryDescription = PickAndDeliveryDescription;
            ConfirmationCode = new ConfirmationCode("Pending");
            this.PickupUserId = PickupUserId;
            this.DeliveryUserId = DeliveryUserId;
            Active = true;
        }

        public void ChangeDescription(PickAndDeliveryDescription PickAndDeliveryDescription)
        {
            if (!Active)
            {
                throw new BusinessRuleValidationException("Task is not active.");
            }
            this.PickAndDeliveryDescription = PickAndDeliveryDescription;
        }

        public void ChangeConfirmationCode(ConfirmationCode ConfirmationCode)
        {
            if (!Active)
            {
                throw new BusinessRuleValidationException("Task is not active.");
            }
            this.ConfirmationCode = ConfirmationCode;
        }

        public void ChangePickupUserId(UserId PickupUserId)
        {
            if (!Active)
            {
                throw new BusinessRuleValidationException("Task is not active.");
            }
            this.PickupUserId = PickupUserId;
        }

        public void ChangeDeliveryUserId(UserId DeliveryUserId)
        {
            if (!Active)
            {
                throw new BusinessRuleValidationException("Task is not active.");
            }
            this.DeliveryUserId = DeliveryUserId;
        }

        public void Deactivate()
        {
            this.Active = false;
        }
    }
}
