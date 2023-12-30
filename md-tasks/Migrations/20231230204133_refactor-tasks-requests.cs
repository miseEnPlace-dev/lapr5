using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MDTasks.Migrations
{
    /// <inheritdoc />
    public partial class refactortasksrequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Tasks",
                schema: "ddd",
                table: "Tasks");

            migrationBuilder.RenameTable(
                name: "SurveillanceRequests",
                schema: "ddd",
                newName: "SurveillanceRequests");

            migrationBuilder.RenameTable(
                name: "PickAndDeliveryRequests",
                schema: "ddd",
                newName: "PickAndDeliveryRequests");

            migrationBuilder.RenameTable(
                name: "Tasks",
                schema: "ddd",
                newName: "Requests");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Requests",
                table: "Requests",
                columns: new[] { "Id", "RequestId", "CreatedAt" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Requests",
                table: "Requests");

            migrationBuilder.EnsureSchema(
                name: "ddd");

            migrationBuilder.RenameTable(
                name: "SurveillanceRequests",
                newName: "SurveillanceRequests",
                newSchema: "ddd");

            migrationBuilder.RenameTable(
                name: "PickAndDeliveryRequests",
                newName: "PickAndDeliveryRequests",
                newSchema: "ddd");

            migrationBuilder.RenameTable(
                name: "Requests",
                newName: "Tasks",
                newSchema: "ddd");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tasks",
                schema: "ddd",
                table: "Tasks",
                columns: new[] { "Id", "RequestId", "CreatedAt" });
        }
    }
}
