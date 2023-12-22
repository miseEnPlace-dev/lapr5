using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DDDNetCore.Migrations
{
    /// <inheritdoc />
    public partial class renamedtasktables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "ddd");

            migrationBuilder.RenameTable(
                name: "SurveillanceTasks",
                newName: "SurveillanceTasks",
                newSchema: "ddd");

            migrationBuilder.RenameTable(
                name: "PickAndDeliveryTasks",
                newName: "PickAndDeliveryTasks",
                newSchema: "ddd");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "SurveillanceTasks",
                schema: "ddd",
                newName: "SurveillanceTasks");

            migrationBuilder.RenameTable(
                name: "PickAndDeliveryTasks",
                schema: "ddd",
                newName: "PickAndDeliveryTasks");
        }
    }
}
