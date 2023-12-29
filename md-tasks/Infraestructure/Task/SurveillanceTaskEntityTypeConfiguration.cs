using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.DeviceTasks.SurveillanceTask;
using DDDSample1.Domain.User;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;
using DDDSample1.Domain.Floor;

namespace DDDSample1.Infrastructure.Tasks;

internal class SurveillanceTaskEntityTypeConfiguration : IEntityTypeConfiguration<SurveillanceTask>
{
  public void Configure(EntityTypeBuilder<SurveillanceTask> builder)
  {
    //builder.ToTable("SurveillanceTasks", SchemaNames.DDDSample1);
    builder.HasKey(b => b.Id);
    builder.Property(b => b.Description).HasConversion(b => b.Value, b => new TaskDescription(b));
    builder.Property(b => b.FloorId).HasColumnName("floor_id").HasConversion(b => b.Value, b => new FloorId(b));
    builder.Property(b => b.UserName).HasConversion(b => b.Name, b => new UserName(b));
    builder.Property(b => b.UserPhoneNumber).HasConversion(b => b.PhoneNumber, b => new UserPhoneNumber(b));
    builder.Property(b => b.StartCoordinateX);
    builder.Property(b => b.StartCoordinateY);
    builder.Property(b => b.EndCoordinateX);
    builder.Property(b => b.EndCoordinateY);
    builder.Property(b => b.UserId).HasConversion(b => b.Value, b => new UserId(b));
    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
