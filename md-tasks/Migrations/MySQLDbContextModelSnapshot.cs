﻿// <auto-generated />
using System;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

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

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask.PickAndDeliveryTask", b =>
                {
                    b.Property<string>("DeliveryRoomId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("DeliveryUserId")
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("Id")
                        .HasColumnType("longtext");

                    b.Property<string>("PickupRoomId")
                        .HasColumnType("longtext");

                    b.Property<string>("PickupUserId")
                        .HasColumnType("longtext");

                    b.HasKey("DeliveryRoomId");

                    b.ToTable("PickAndDeliveryTasks");
                });

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.SurveillanceTask.SurveillanceTask", b =>
                {
                    b.Property<string>("DeliveryRoomId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("TargetFloor")
                        .HasColumnType("longtext");

                    b.Property<string>("UserContact")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("SurveillanceTasks");
                });

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.SurveillanceTask.SurveillanceTask", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("DeviceTaskId")
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("TargetFloor")
                        .HasColumnType("longtext");

                    b.Property<string>("UserContact")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("SurveillanceTasks");
                });

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask.PickAndDeliveryTask", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.DeviceTasks.PickAndDeliveryTask.ConfirmationCode", "ConfirmationCode", b1 =>
                        {
                            b1.Property<string>("PickAndDeliveryTaskDeliveryRoomId")
                                .HasColumnType("varchar(255)");

                            b1.Property<string>("Code")
                                .HasColumnType("longtext");

                            b1.HasKey("PickAndDeliveryTaskDeliveryRoomId");

                            b1.ToTable("PickAndDeliveryTasks");

                            b1.WithOwner()
                                .HasForeignKey("PickAndDeliveryTaskDeliveryRoomId");
                        });

                    b.Navigation("ConfirmationCode");
                });

            modelBuilder.Entity("DDDSample1.Domain.Requests.Request", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.Requests.RequestState", "State", b1 =>
                        {
                            b1.Property<DateTime>("RequestedAt")
                                .HasColumnType("datetime(6)");

                            b1.Property<StateEnum>("State")
                                .HasColumnType("enum MySQLDbContextModelSnapshot.StateEnum");
                            {
                                b1.HasAnnotation("MySql:ColumnType", "enum('Pending','Accepted','Rejected, Executed')");
                            }

                            b1.HasKey("RequestedAt");

                            b1.ToTable("Requests");

                            b1.WithOwner()
                                .HasForeignKey("RequestedAt");
                        });

                    b.Navigation("State");
                });
#pragma warning restore 612, 618
        }
    }
}
