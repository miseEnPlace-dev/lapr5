﻿// <auto-generated />
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DDDNetCore.Migrations
{
    [DbContext(typeof(MySQLDbContext))]
    partial class MySQLDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.DeviceTask", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<bool>("_active")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("Active");

                    b.HasKey("Id");

                    b.ToTable("Tasks", "ddd");
                });

            modelBuilder.Entity("DDDSample1.Domain.Requests.Request", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("DeviceTaskId")
                        .HasColumnType("longtext");

                    b.Property<bool>("_active")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("Active");

                    b.HasKey("Id");

                    b.ToTable("Requests", "ddd", t =>
                        {
                            t.Property("Active")
                                .HasColumnName("Active1");
                        });
                });

            modelBuilder.Entity("DDDSample1.Domain.Requests.Request", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.DeviceModel.DeviceModelCode", "DeviceModelCode", b1 =>
                        {
                            b1.Property<string>("RequestId")
                                .HasColumnType("varchar(255)");

                            b1.Property<string>("Code")
                                .HasColumnType("longtext");

                            b1.HasKey("RequestId");

                            b1.ToTable("Requests", "ddd");

                            b1.WithOwner()
                                .HasForeignKey("RequestId");
                        });

                    b.OwnsOne("DDDSample1.Domain.Requests.RequestState", "State", b1 =>
                        {
                            b1.Property<string>("RequestId")
                                .HasColumnType("varchar(255)");

                            b1.Property<string>("State")
                                .HasColumnType("longtext");

                            b1.HasKey("RequestId");

                            b1.ToTable("Requests", "ddd");

                            b1.WithOwner()
                                .HasForeignKey("RequestId");
                        });

                    b.OwnsOne("DDDSample1.Domain.User.UserEmail", "UserEmail", b1 =>
                        {
                            b1.Property<string>("RequestId")
                                .HasColumnType("varchar(255)");

                            b1.Property<string>("Email")
                                .HasColumnType("longtext");

                            b1.HasKey("RequestId");

                            b1.ToTable("Requests", "ddd");

                            b1.WithOwner()
                                .HasForeignKey("RequestId");
                        });

                    b.Navigation("DeviceModelCode");

                    b.Navigation("State");

                    b.Navigation("UserEmail");
                });
#pragma warning restore 612, 618
        }
    }
}
