using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DDDNetCore.Migrations
{
    /// <inheritdoc />
    public partial class refactortasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Requests",
                newName: "DeviceId");

            migrationBuilder.AddColumn<DateTime>(
                name: "RequestedAt",
                table: "SurveillanceTasks",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "SurveillanceTasks",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "RequestedAt",
                table: "PickAndDeliveryTasks",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "PickAndDeliveryTasks",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequestedAt",
                table: "SurveillanceTasks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SurveillanceTasks");

            migrationBuilder.DropColumn(
                name: "RequestedAt",
                table: "PickAndDeliveryTasks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "PickAndDeliveryTasks");

            migrationBuilder.RenameColumn(
                name: "DeviceId",
                table: "Requests",
                newName: "UserId");
        }
    }
}
