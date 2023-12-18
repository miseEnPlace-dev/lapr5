// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
// using DDDSample1.Domain.Tasks;
// using DDDSample1.Domain.Tasks.SurveillanceTask;

// namespace DDDSample1.Infrastructure.Tasks;

// internal class TaskEntityTypeConfiguration : IEntityTypeConfiguration<S>
// {
//   public void Configure(EntityTypeBuilder<SurveillanceTask> builder)
//   {
//     // builder.ToTable("Tasks", SchemaNames.DDDSample1);
//     builder.HasKey(b => b.Id);
//     // builder.Property<bool>("_active").HasColumnName("Active");
//   }
// }