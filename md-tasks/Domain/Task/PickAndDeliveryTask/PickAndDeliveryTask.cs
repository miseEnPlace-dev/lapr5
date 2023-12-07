using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Tasks;

namespace DDDSample1.Domain.Categories
{
    public class PickAndDeliveryTask : Task
    {
        public PickAndDeliveryDescription PickAndDeliveryDescription { get; private set; }
        public ConfirmationCode ConfirmationCode { get; private set; }

        public PickAndDeliveryTask(PickAndDeliveryDescription PickAndDeliveryDescription) : base()
        {
            this.PickAndDeliveryDescription = PickAndDeliveryDescription;
        }
    }
}