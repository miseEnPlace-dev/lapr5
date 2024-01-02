using System.Threading.Tasks;
using MDTasks.DTO;
using MDTasks.Domain.Request;
using MDTasks.Infrastructure;

namespace MDTasks.Mappers;

public class RequestMapper
{
  private readonly ISurveillanceRequestRepository svReqRepo;
  private readonly IPickAndDeliveryRequestRepository pdReqRepo;

  public RequestMapper(ISurveillanceRequestRepository svReqRepo, IPickAndDeliveryRequestRepository pdReqRepo)
  {
    this.svReqRepo = svReqRepo;
    this.pdReqRepo = pdReqRepo;
  }

  public async Task<RequestDTO> ToDto(Request t, string type)
  {
    if (type.Equals("SurveillanceRequestDTO"))
    {
      SurveillanceRequest task = await svReqRepo.GetByIdAsync(t.Id);
      return new SurveillanceRequestDTO(
          t.Id.Value,
          task.Description.Value,
          task.UserName.Name,
          task.UserPhoneNumber.PhoneNumber,
          task.FloorId.Value,
          task.StartCoordinateX,
          task.StartCoordinateY,
          task.EndCoordinateX,
          task.EndCoordinateY,
          t.UserId.Value,
          task.State.State.ToString(),
          t.RequestedAt.ToString()
      );
    }

    if (type.Equals("PickAndDeliveryRequestDTO"))
    {
      PickAndDeliveryRequest task = await pdReqRepo.GetByIdAsync(t.Id);

      return new PickAndDeliveryRequestDTO(
          t.Id.Value,
          task.Description.Value,
          task.PickupUserName.Name,
          task.DeliveryUserName.Name,
          task.PickupUserPhoneNumber.PhoneNumber,
          task.DeliveryUserPhoneNumber.PhoneNumber,
          task.PickupRoomId.Value,
          task.DeliveryRoomId.Value,
          task.ConfirmationCode.Code,
          task.StartCoordinateX,
          task.StartCoordinateY,
          task.EndCoordinateX,
          task.EndCoordinateY,
          task.StartFloorCode,
          task.EndFloorCode,
          t.UserId.Value,
          task.State.State.ToString(),
          t.RequestedAt.ToString()
      );
    }

    return null;
  }
}
