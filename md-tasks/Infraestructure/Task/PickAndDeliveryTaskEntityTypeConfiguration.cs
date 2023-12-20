using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;

namespace DDDSample1.Infrastructure.Tasks;

internal class PickAndDeliveryTaskEntityTypeConfiguration : IEntityTypeConfiguration<PickAndDeliveryTask>
{
  public void Configure(EntityTypeBuilder<PickAndDeliveryTask> builder)
  {
    // builder.ToTable("Tasks", SchemaNames.DDDSample1);
    builder.HasKey(b => b.Id);
    builder.HasKey(b => b.PickupUserId);
    builder.OwnsOne(b => b.ConfirmationCode);
    builder.Property(b => b.Description).HasConversion(b => b.Value, b => new PickAndDeliveryDescription(b));
    builder.HasKey(b => b.PickupRoomId);
    builder.HasKey(b => b.DeliveryRoomId);
    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
