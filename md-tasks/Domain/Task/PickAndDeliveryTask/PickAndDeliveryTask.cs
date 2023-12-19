// using DDDSample1.Domain.DeviceTasks;
// using DDDSample1.Domain.Room;
// using DDDSample1.Domain.Shared;
// using DDDSample1.Domain.User;

// namespace DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask
// {
//     public class PickAndDeliveryTask : DeviceTask
//     {
//         public PickAndDeliveryDescription PickAndDeliveryDescription { get; private set; }
//         public ConfirmationCode ConfirmationCode { get; private set; }

//         public UserEmail PickupUserId { get; private set; }
//         public UserEmail DeliveryUserId { get; private set; }
//         public RoomId PickupRoomId { get; private set; }

//         public RoomId DeliveryRoomId { get; private set; }

//         public bool Active { get; private set; }

//         private PickAndDeliveryTask()
//         {
//             Active = true;
//         }

//         public PickAndDeliveryTask(PickAndDeliveryDescription PickAndDeliveryDescription, UserEmail PickupUserId, UserEmail DeliveryUserId, RoomId PickupRoomId, RoomId DeliveryRoomId)
//         {
//             this.PickAndDeliveryDescription = PickAndDeliveryDescription;
//             ConfirmationCode = new ConfirmationCode("Pending");
//             this.PickupUserId = PickupUserId;
//             this.DeliveryUserId = DeliveryUserId;
//             this.PickupRoomId = PickupRoomId;
//             this.DeliveryRoomId = DeliveryRoomId;
//             Active = true;
//         }

//         public void ChangeDescription(PickAndDeliveryDescription PickAndDeliveryDescription)
//         {
//             if (!Active)
//             {
//                 throw new BusinessRuleValidationException("Task is not active.");
//             }
//             this.PickAndDeliveryDescription = PickAndDeliveryDescription;
//         }

//         public void ChangeConfirmationCode(ConfirmationCode ConfirmationCode)
//         {
//             if (!Active)
//             {
//                 throw new BusinessRuleValidationException("Task is not active.");
//             }
//             this.ConfirmationCode = ConfirmationCode;
//         }

//         public void ChangePickupUserId(User.UserEmail PickupUserId)
//         {
//             if (!Active)
//             {
//                 throw new BusinessRuleValidationException("Task is not active.");
//             }
//             this.PickupUserId = PickupUserId;
//         }

//         public void ChangeDeliveryUserId(User.UserEmail DeliveryUserId)
//         {
//             if (!Active)
//             {
//                 throw new BusinessRuleValidationException("Task is not active.");
//             }
//             this.DeliveryUserId = DeliveryUserId;
//         }

//         public void ChangePickupRoomId(RoomId PickupRoomId)
//         {
//             if (!Active)
//             {
//                 throw new BusinessRuleValidationException("Task is not active.");
//             }
//             this.PickupRoomId = PickupRoomId;
//         }

//         public void ChangeDeliveryRoomId(RoomId DeliveryRoomId)
//         {
//             if (!Active)
//             {
//                 throw new BusinessRuleValidationException("Task is not active.");
//             }
//             this.DeliveryRoomId = DeliveryRoomId;
//         }

//         public void Deactivate()
//         {
//             this.Active = false;
//         }

//         public override void ExecuteTask()
//         {
//             throw new System.NotImplementedException();
//         }
//     }
// }
