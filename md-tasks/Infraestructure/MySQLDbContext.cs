using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Requests;
using DDDSample1.Infrastructure.Requests;
using DDDSample1.Infrastructure.Tasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTask;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask;
using DDDSample1.Domain.DeviceTasks;

namespace DDDSample1.Infrastructure
{
  public class MySQLDbContext : DbContext
  {
    public DbSet<Request> Requests { get; set; }

    public DbSet<SurveillanceTask> SurveillanceTasks { get; set; }
    public DbSet<PickAndDeliveryTask> PickAndDeliveryTasks { get; set; }

    public string ConnectionString { get; set; }
    public MySQLDbContext(DbContextOptions<MySQLDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      //modelBuilder.ApplyConfiguration(new DeviceTaskEntityTypeConfiguration());
      modelBuilder.ApplyConfiguration(new RequestEntityTypeConfiguration());
      modelBuilder.ApplyConfiguration(new PickAndDeliveryTaskEntityTypeConfiguration());
      modelBuilder.ApplyConfiguration(new SurveillanceTaskEntityTypeConfiguration());
    }
  }
}
