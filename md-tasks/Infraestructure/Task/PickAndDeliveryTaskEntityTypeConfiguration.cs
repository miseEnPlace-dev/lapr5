using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Domain.User;

namespace DDDSample1.Infrastructure.Tasks;

internal class PickAndDeliveryTaskEntityTypeConfiguration : IEntityTypeConfiguration<PickAndDeliveryTask>
{
  public void Configure(EntityTypeBuilder<PickAndDeliveryTask> builder)
  {
    builder.ToTable("PickAndDeliveryTasks", SchemaNames.DDDSample1);
    //builder.Property(b => b.Id);
    builder.OwnsOne(b => b.ConfirmationCode);
    builder.Property(b => b.Description).HasConversion(b => b.Value, b => new TaskDescription(b));
    builder.Property(b => b.PickupRoomId);
    builder.Property(b => b.DeliveryRoomId);
    var userIdConverter = new ValueConverter<UserId, string>(
             v => v.Value,
             v => new UserId(v)
         );

    builder.Property(b => b.PickupUserId)
        .HasColumnName("pickup_user_id")
        .HasConversion(userIdConverter);

    builder.Property(b => b.DeliveryUserId)
        .HasColumnName("delivery_user_id")
        .HasConversion(userIdConverter);
    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
