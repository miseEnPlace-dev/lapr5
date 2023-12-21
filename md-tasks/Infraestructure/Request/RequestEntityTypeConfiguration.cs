using DDDSample1.Domain.Requests;
using DDDSample1.Domain.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.Requests
{
  internal class RequestEntityTypeConfiguration : IEntityTypeConfiguration<Request>
  {
    public void Configure(EntityTypeBuilder<Request> builder)
    {
      // builder.ToTable("Requests", SchemaNames.DDDSample1);
      builder.HasKey(b => new { b.Id, b.DeviceTaskId, b.RequestedAt });
      builder.Property(b => b.State).HasColumnName("State").HasConversion(s => s.State, s => new RequestState(s));
      builder.Property(b => b.UserId).HasConversion(b => b.Value, b => new UserId(b));
      // builder.OwnsOne(b => b.UserId);
      // builder.Property<bool>("_active").HasColumnName("Active");
    }
  }
}
