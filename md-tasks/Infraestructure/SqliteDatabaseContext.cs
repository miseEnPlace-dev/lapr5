using DDDSample1.Domain.Requests;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public class SqliteDatabaseContext : DbContext
{

  public DbSet<Request> Requests { get; set; }

  public DbSet<Task> Tasks { get; set; }


  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseSqlite("Data Source=database.db");
  }
}

