using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Domain.User;
using DDDSample1.Domain.Room;

namespace DDDSample1.Infrastructure.Tasks;

internal class PickAndDeliveryRequestEntityTypeConfiguration : IEntityTypeConfiguration<PickAndDeliveryRequest>
{
  public void Configure(EntityTypeBuilder<PickAndDeliveryRequest> builder)
  {
    //builder.ToTable("PickAndDeliveryTasks", SchemaNames.DDDSample1);
    //builder.Property(b => b.Id);
    builder.Property(b => b.ConfirmationCode).HasConversion(b => b.Code, b => new ConfirmationCode(b));
    builder.Property(b => b.Description).HasConversion(b => b.Value, b => new RequestDescription(b));
    builder.Property(b => b.PickupRoomId).HasConversion(b => b.Value, b => new RoomId(b));
    builder.Property(b => b.DeliveryRoomId).HasConversion(b => b.Value, b => new RoomId(b));
    builder.Property(b => b.PickupUserName).HasConversion(b => b.Name, b => new UserName(b));
    builder.Property(b => b.DeliveryUserName).HasConversion(b => b.Name, b => new UserName(b));
    builder.Property(b => b.PickupUserPhoneNumber).HasConversion(b => b.PhoneNumber, b => new UserPhoneNumber(b));
    builder.Property(b => b.DeliveryUserPhoneNumber).HasConversion(b => b.PhoneNumber, b => new UserPhoneNumber(b));
    builder.Property(b => b.StartCoordinateX);
    builder.Property(b => b.StartCoordinateY);
    builder.Property(b => b.EndCoordinateX);
    builder.Property(b => b.EndCoordinateY);
    builder.Property(b => b.StartFloorCode);
    builder.Property(b => b.EndFloorCode);
    builder.Property(b => b.UserId).HasConversion(b => b.Value, b => new UserId(b));
    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
