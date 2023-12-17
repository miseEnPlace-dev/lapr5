using DDDSample1.Domain.Requests;
using DDDSample1.Domain.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.Requests;

internal class RequestEntityTypeConfiguration : IEntityTypeConfiguration<Request>
{
  public void Configure(EntityTypeBuilder<Request> builder)
  {
    builder.HasKey(b => b.Id);
    builder.OwnsOne(b => b.State);
    builder.OwnsOne(b => b.DeviceModelId);
    builder.Property(b => b.UserId).HasConversion(b => b.AsGuid(), b => new UserId(b));
  }
}
