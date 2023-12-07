using System;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Categories
{
    public class Request : Entity<RequestId>, IAggregateRoot
    {

        public RequestState State { get; private set; }
        public Task Task { get; private set; }

        private Request()
        {
            this.State = new RequestState("Pending");
        }

        public Request(PickAndDeliveryTask task)
        {
            this.Id = new RequestId(Guid.NewGuid());
            this.State = new RequestState("Pending");
        }

        public void ChangeState(string state)
        {
            this.State.ChangeState(state);
        }
    }
}