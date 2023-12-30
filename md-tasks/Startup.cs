using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Shared;
using DDDSample1.Infrastructure.Requests;
using DDDSample1.Domain.Requests;
using DDDSample1.Domain.DeviceTasks;
using DDDSample1.Infrastructure.DeviceTasks;
using System;
using DDDSample1.Domain.DeviceTasks.SurveillanceTasks;
using DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks;
using DDDNetCore.Services;

namespace DDDSample1
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // services.AddDbContext<DDDSample1DbContext>(opt =>
      //     opt.UseInMemoryDatabase("DDDSample1DB")
      //     .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

      // services.AddDbContext<SqliteDatabaseContext>(opt => opt.UseSqlite()
      //      .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

      services.AddDbContext<MySQLDbContext>(opt =>
          opt.UseMySql(Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(Configuration.GetConnectionString("DefaultConnection")))
          .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());


      services.AddCors(options =>
            {
              options.AddPolicy("AllowAnyOrigin",
                  builder => builder
                      .AllowAnyMethod()
                      .AllowAnyHeader()
                      .AllowAnyOrigin());
            });

      ConfigureMyServices(services);
      services.AddControllers().AddNewtonsoftJson();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
        app.UseDeveloperExceptionPage();
      else
        app.UseHsts();
      // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.


      app.UseCors("AllowAnyOrigin");

      // app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }

    public void ConfigureMyServices(IServiceCollection services)
    {
      services.AddTransient<IUnitOfWork, UnitOfWork>();

      services.AddTransient<ITaskRepository, RequestRepository>();
      services.AddTransient<ITaskService, TaskService>();

      services.AddTransient<ISurveillanceRequestRepository, SurveillanceRequestRepository>();
      services.AddTransient<IPickAndDeliveryRequestRepository, PickAndDeliveryRequestRepository>();
      services.AddTransient<IRequestService, RequestService>();
    }
  }
}
