using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DDDNetCore.Migrations
{
    /// <inheritdoc />
    public partial class requestState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "State_State",
                table: "SurveillanceRequests",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "State_State",
                table: "PickAndDeliveryRequests",
                newName: "State");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "State",
                table: "SurveillanceRequests",
                newName: "State_State");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "PickAndDeliveryRequests",
                newName: "State_State");
        }
    }
}
