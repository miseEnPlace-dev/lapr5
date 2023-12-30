using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DDDNetCore.Migrations
{
    /// <inheritdoc />
    public partial class taskState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State",
                table: "Requests");

            migrationBuilder.RenameColumn(
                name: "RequestedAt",
                table: "Requests",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<int>(
                name: "State_State",
                table: "SurveillanceTasks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "State_State",
                table: "PickAndDeliveryTasks",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State_State",
                table: "SurveillanceTasks");

            migrationBuilder.DropColumn(
                name: "State_State",
                table: "PickAndDeliveryTasks");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Requests",
                newName: "RequestedAt");

            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "Requests",
                type: "int",
                nullable: true);
        }
    }
}
