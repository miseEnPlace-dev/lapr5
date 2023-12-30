using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MDTasks.Migrations
{
    /// <inheritdoc />
    public partial class updatedsurveillancetask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EndCoordinateX",
                table: "SurveillanceTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EndCoordinateY",
                table: "SurveillanceTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EndRoomId",
                table: "SurveillanceTasks",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "StartCoordinateX",
                table: "SurveillanceTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartCoordinateY",
                table: "SurveillanceTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "StartRoomId",
                table: "SurveillanceTasks",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndCoordinateX",
                table: "SurveillanceTasks");

            migrationBuilder.DropColumn(
                name: "EndCoordinateY",
                table: "SurveillanceTasks");

            migrationBuilder.DropColumn(
                name: "EndRoomId",
                table: "SurveillanceTasks");

            migrationBuilder.DropColumn(
                name: "StartCoordinateX",
                table: "SurveillanceTasks");

            migrationBuilder.DropColumn(
                name: "StartCoordinateY",
                table: "SurveillanceTasks");

            migrationBuilder.DropColumn(
                name: "StartRoomId",
                table: "SurveillanceTasks");
        }
    }
}
