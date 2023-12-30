using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Requests;
using DDDSample1.Infrastructure.Requests;
using DDDSample1.Infrastructure.Tasks;
using DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;

namespace DDDSample1.Infrastructure
{
  public class MySQLDbContext : DbContext
  {
    public DbSet<DeviceTask> Requests { get; set; }

    public DbSet<SurveillanceRequest> SurveillanceRequests { get; set; }
    public DbSet<PickAndDeliveryRequest> PickAndDeliveryRequests { get; set; }

    public string ConnectionString { get; set; }
    public MySQLDbContext(DbContextOptions<MySQLDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      //modelBuilder.ApplyConfiguration(new DeviceTaskEntityTypeConfiguration());
      modelBuilder.ApplyConfiguration(new TaskEntityTypeConfiguration());
      modelBuilder.ApplyConfiguration(new PickAndDeliveryRequestEntityTypeConfiguration());
      modelBuilder.ApplyConfiguration(new SurveillanceRequestEntityTypeConfiguration());
    }
  }
}
