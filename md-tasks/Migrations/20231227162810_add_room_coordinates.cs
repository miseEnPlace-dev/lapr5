using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DDDNetCore.Migrations
{
    /// <inheritdoc />
    public partial class addroomcoordinates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "EndCoordinateX",
                table: "PickAndDeliveryTasks",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "EndCoordinateY",
                table: "PickAndDeliveryTasks",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "StartCoordinateX",
                table: "PickAndDeliveryTasks",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "StartCoordinateY",
                table: "PickAndDeliveryTasks",
                type: "double",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndCoordinateX",
                table: "PickAndDeliveryTasks");

            migrationBuilder.DropColumn(
                name: "EndCoordinateY",
                table: "PickAndDeliveryTasks");

            migrationBuilder.DropColumn(
                name: "StartCoordinateX",
                table: "PickAndDeliveryTasks");

            migrationBuilder.DropColumn(
                name: "StartCoordinateY",
                table: "PickAndDeliveryTasks");
        }
    }
}
