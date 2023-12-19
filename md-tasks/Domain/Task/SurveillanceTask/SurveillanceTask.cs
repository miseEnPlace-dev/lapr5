// using System;
// using DDDSample1.Domain.Floor;
// using DDDSample1.Domain.Shared;
// using DDDSample1.Domain.User;

// namespace DDDSample1.Domain.DeviceTasks.SurveillanceTask
// {
//   public class SurveillanceTask : DeviceTask
//   {
//     public string Description { get; private set; }

//     public bool Active { get; private set; }

//     public UserEmail UserContact { get; private set; }

//     public FloorId TargetFloor { get; private set; }

//     public SurveillanceTask()
//     {
//       Active = true;
//     }

//     public SurveillanceTask(string description, UserEmail userContact)
//     {
//       Description = description;
//       UserContact = userContact;
//       Active = true;
//     }


//     public void ChangeDescription(string description)
//     {
//       if (!Active)
//       {
//         throw new BusinessRuleValidationException("Task is not active.");
//       }
//       Description = description;
//     }

//     public void ChangeUserContact(UserEmail userContact)
//     {
//       if (!Active)
//       {
//         throw new BusinessRuleValidationException("Task is not active.");
//       }
//       UserContact = userContact;
//     }

//     public void ChangeTargetFloor(FloorId targetFloor)
//     {
//       if (!Active)
//       {
//         throw new BusinessRuleValidationException("Task is not active.");
//       }
//       TargetFloor = targetFloor;
//     }

//     public void Deactivate()
//     {
//       Active = false;
//     }

//     public override void ExecuteTask()
//     {
//       throw new NotImplementedException();
//     }
//   }
// }
