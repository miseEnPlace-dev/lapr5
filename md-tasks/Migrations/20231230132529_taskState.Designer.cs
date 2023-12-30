﻿// <auto-generated />
using System;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DDDNetCore.Migrations
{
    [DbContext(typeof(MySQLDbContext))]
    [Migration("20231230132529_taskState")]
    partial class taskState
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks.PickAndDeliveryTask", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConfirmationCode")
                        .HasColumnType("longtext");

                    b.Property<string>("DeliveryRoomId")
                        .HasColumnType("longtext");

                    b.Property<string>("DeliveryUserName")
                        .HasColumnType("longtext");

                    b.Property<string>("DeliveryUserPhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int>("EndCoordinateX")
                        .HasColumnType("int");

                    b.Property<int>("EndCoordinateY")
                        .HasColumnType("int");

                    b.Property<string>("EndFloorCode")
                        .HasColumnType("longtext");

                    b.Property<string>("PickupRoomId")
                        .HasColumnType("longtext");

                    b.Property<string>("PickupUserName")
                        .HasColumnType("longtext");

                    b.Property<string>("PickupUserPhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("StartCoordinateX")
                        .HasColumnType("int");

                    b.Property<int>("StartCoordinateY")
                        .HasColumnType("int");

                    b.Property<string>("StartFloorCode")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("PickAndDeliveryTasks");
                });

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.SurveillanceTasks.SurveillanceTask", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int>("EndCoordinateX")
                        .HasColumnType("int");

                    b.Property<int>("EndCoordinateY")
                        .HasColumnType("int");

                    b.Property<string>("FloorId")
                        .HasColumnType("longtext")
                        .HasColumnName("floor_id");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("StartCoordinateX")
                        .HasColumnType("int");

                    b.Property<int>("StartCoordinateY")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.Property<string>("UserName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserPhoneNumber")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("SurveillanceTasks");
                });

            modelBuilder.Entity("DDDSample1.Domain.Requests.Request", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("DeviceTaskId")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("DeviceId")
                        .HasColumnType("longtext");

                    b.HasKey("Id", "DeviceTaskId", "CreatedAt");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks.PickAndDeliveryTask", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.Requests.RequestState", "State", b1 =>
                        {
                            b1.Property<string>("PickAndDeliveryTaskId")
                                .HasColumnType("varchar(255)");

                            b1.Property<int>("State")
                                .HasColumnType("int");

                            b1.HasKey("PickAndDeliveryTaskId");

                            b1.ToTable("PickAndDeliveryTasks");

                            b1.WithOwner()
                                .HasForeignKey("PickAndDeliveryTaskId");
                        });

                    b.Navigation("State");
                });

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.SurveillanceTasks.SurveillanceTask", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.Requests.RequestState", "State", b1 =>
                        {
                            b1.Property<string>("SurveillanceTaskId")
                                .HasColumnType("varchar(255)");

                            b1.Property<int>("State")
                                .HasColumnType("int");

                            b1.HasKey("SurveillanceTaskId");

                            b1.ToTable("SurveillanceTasks");

                            b1.WithOwner()
                                .HasForeignKey("SurveillanceTaskId");
                        });

                    b.Navigation("State");
                });
#pragma warning restore 612, 618
        }
    }
}