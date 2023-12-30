﻿// <auto-generated />
using System;
using MDTasks.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MDTasks.Migrations
{
    [DbContext(typeof(MySQLDbContext))]
    [Migration("20231230204133_refactor-tasks-requests")]
    partial class refactortasksrequests
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("MDTasks.Domain.Requests.PickAndDeliveryRequest", b =>
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

                    b.Property<int>("EndCoordinatesX")
                        .HasColumnType("int");

                    b.Property<int>("EndCoordinatesY")
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

                    b.Property<int>("StartCoordinatesX")
                        .HasColumnType("int");

                    b.Property<int>("StartCoordinatesY")
                        .HasColumnType("int");

                    b.Property<string>("StartFloorCode")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("PickAndDeliveryRequests");
                });

            modelBuilder.Entity("MDTasks.Domain.Requests.SurveillanceRequest", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int>("EndCoordinatesX")
                        .HasColumnType("int");

                    b.Property<int>("EndCoordinatesY")
                        .HasColumnType("int");

                    b.Property<string>("FloorId")
                        .HasColumnType("longtext")
                        .HasColumnName("floor_id");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("StartCoordinatesX")
                        .HasColumnType("int");

                    b.Property<int>("StartCoordinatesY")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("longtext");

                    b.Property<string>("UserName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserPhoneNumber")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("SurveillanceRequests");
                });

            modelBuilder.Entity("MDTasks.Domain.Tasks.DeviceTask", b =>
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

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("MDTasks.Domain.Requests.PickAndDeliveryRequest", b =>
                {
                    b.OwnsOne("MDTasks.Domain.Requests.RequestState", "State", b1 =>
                        {
                            b1.Property<string>("PickAndDeliveryRequestId")
                                .HasColumnType("varchar(255)");

                            b1.Property<int>("State")
                                .HasColumnType("int");

                            b1.HasKey("PickAndDeliveryRequestId");

                            b1.ToTable("PickAndDeliveryRequests");

                            b1.WithOwner()
                                .HasForeignKey("PickAndDeliveryRequestId");
                        });

                    b.Navigation("State");
                });

            modelBuilder.Entity("MDTasks.Domain.Requests.SurveillanceRequest", b =>
                {
                    b.OwnsOne("MDTasks.Domain.Requests.RequestState", "State", b1 =>
                        {
                            b1.Property<string>("SurveillanceRequestId")
                                .HasColumnType("varchar(255)");

                            b1.Property<int>("State")
                                .HasColumnType("int");

                            b1.HasKey("SurveillanceRequestId");

                            b1.ToTable("SurveillanceRequests");

                            b1.WithOwner()
                                .HasForeignKey("SurveillanceRequestId");
                        });

                    b.Navigation("State");
                });
#pragma warning restore 612, 618
        }
    }
}
