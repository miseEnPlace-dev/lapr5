using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Task;

namespace DDDSample1.Domain.Task.PickAndDeliveryTask
{
    public class PickAndDeliveryTask
    {
        public PickAndDeliveryDescription PickAndDeliveryDescription { get; private set; }
        public ConfirmationCode ConfirmationCode { get; private set; }

        public PickAndDeliveryTask(PickAndDeliveryDescription PickAndDeliveryDescription)
        {
            this.PickAndDeliveryDescription = PickAndDeliveryDescription;
        }
    }
}