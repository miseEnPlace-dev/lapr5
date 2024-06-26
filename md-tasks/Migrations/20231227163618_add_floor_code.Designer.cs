﻿// <auto-generated />
using System;
using MDTasks.Domain.Request;
using MDTasks.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DDDNetCore.Migrations
{
    [DbContext(typeof(MySQLDbContext))]
    [Migration("20231227163618_add_floor_code")]
    partial class addfloorcode
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("MDTasks.Domain.DeviceTasks.PickAndDeliveryTask.PickAndDeliveryTask", b =>
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

                    b.Property<double>("EndCoordinateX")
                        .HasColumnType("double");

                    b.Property<double>("EndCoordinateY")
                        .HasColumnType("double");

                    b.Property<string>("EndFloorCode")
                        .HasColumnType("longtext");

                    b.Property<string>("PickupRoomId")
                        .HasColumnType("longtext");

                    b.Property<string>("PickupUserName")
                        .HasColumnType("longtext");

                    b.Property<string>("PickupUserPhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<double>("StartCoordinateX")
                        .HasColumnType("double");

                    b.Property<double>("StartCoordinateY")
                        .HasColumnType("double");

                    b.Property<string>("StartFloorCode")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("PickAndDeliveryTasks");
                });

            modelBuilder.Entity("MDTasks.Domain.DeviceTasks.SurveillanceTask.SurveillanceTask", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("FloorId")
                        .HasColumnType("longtext")
                        .HasColumnName("floor_id");

                    b.Property<string>("UserName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserPhoneNumber")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("SurveillanceTasks");
                });

            modelBuilder.Entity("MDTasks.Domain.Requests.Request", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("DeviceTaskId")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<RequestStateEnum?>("State")
                        .HasColumnType("int")
                        .HasColumnName("State");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("Id", "DeviceTaskId", "RequestedAt");

                    b.ToTable("Requests");
                });
#pragma warning restore 612, 618
        }
    }
}
