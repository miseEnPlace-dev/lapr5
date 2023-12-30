using DDDSample1.Domain.Requests;
using DDDSample1.Domain.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.Requests
{
  internal class TaskEntityTypeConfiguration : IEntityTypeConfiguration<DeviceTask>
  {
    public void Configure(EntityTypeBuilder<DeviceTask> builder)
    {
      // builder.ToTable("Requests", SchemaNames.DDDSample1);
      builder.HasKey(b => new { b.Id, b.DeviceTaskId, b.CreatedAt });
      builder.Property(b => b.DeviceId).HasColumnType("longtext");
      // builder.OwnsOne(b => b.UserId);
      // builder.Property<bool>("_active").HasColumnName("Active");
    }
  }
}
