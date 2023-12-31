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
      builder.HasKey(b => new { b.Id, b.RequestId, b.CreatedAt });
      builder.Property(b => b.DeviceId).HasColumnType("longtext");
      builder.Property(b => b.IsFinished).HasColumnType("bit");
      // builder.OwnsOne(b => b.UserId);
      // builder.Property<bool>("_active").HasColumnName("Active");
    }
  }
}
