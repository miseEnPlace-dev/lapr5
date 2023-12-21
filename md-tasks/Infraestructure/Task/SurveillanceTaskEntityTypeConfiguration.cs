using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.DeviceTasks.SurveillanceTask;
using DDDSample1.Domain.User;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DDDSample1.Infrastructure.Tasks;

internal class SurveillanceTaskEntityTypeConfiguration : IEntityTypeConfiguration<SurveillanceTask>
{
  public void Configure(EntityTypeBuilder<SurveillanceTask> builder)
  {
    // builder.ToTable("Tasks", SchemaNames.DDDSample1);
    builder.HasKey(b => b.Id);
    builder.HasKey(b => b.Description);
    builder.HasKey(b => b.TargetFloor);
    var userIdConverter = new ValueConverter<UserEmail, string>(
                 v => v.Email,
                 v => new UserEmail(v)
             );

    builder.Property(b => b.UserContact)
        .HasConversion(userIdConverter);

    // builder.Property<bool>("_active").HasColumnName("Active");
  }
}
