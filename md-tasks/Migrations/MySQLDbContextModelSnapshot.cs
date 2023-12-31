﻿// <auto-generated />
using System;
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

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.PickAndDeliveryTasks.PickAndDeliveryRequest", b =>
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

                    b.Property<StateEnum?>("State")
                        .HasColumnType("int")
                        .HasColumnName("State");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("PickAndDeliveryRequests");
                });

            modelBuilder.Entity("DDDSample1.Domain.DeviceTasks.SurveillanceTasks.SurveillanceRequest", b =>
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

                    b.Property<StateEnum?>("State")
                        .HasColumnType("int")
                        .HasColumnName("State");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.Property<string>("UserName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserPhoneNumber")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("SurveillanceRequests");
                });

            modelBuilder.Entity("DDDSample1.Domain.Requests.DeviceTask", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RequestId")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("DeviceId")
                        .HasColumnType("longtext");

                    b.HasKey("Id", "RequestId", "CreatedAt");

                    b.ToTable("Tasks");
                });
#pragma warning restore 612, 618
        }
    }
}
