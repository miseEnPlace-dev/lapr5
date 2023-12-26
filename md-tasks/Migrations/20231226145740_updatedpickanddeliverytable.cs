using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DDDNetCore.Migrations
{
    /// <inheritdoc />
    public partial class updatedpickanddeliverytable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "pickup_user_id",
                table: "PickAndDeliveryTasks",
                newName: "PickupUserPhoneNumber");

            migrationBuilder.RenameColumn(
                name: "delivery_user_id",
                table: "PickAndDeliveryTasks",
                newName: "PickupUserName");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryUserName",
                table: "PickAndDeliveryTasks",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "DeliveryUserPhoneNumber",
                table: "PickAndDeliveryTasks",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryUserName",
                table: "PickAndDeliveryTasks");

            migrationBuilder.DropColumn(
                name: "DeliveryUserPhoneNumber",
                table: "PickAndDeliveryTasks");

            migrationBuilder.RenameColumn(
                name: "PickupUserPhoneNumber",
                table: "PickAndDeliveryTasks",
                newName: "pickup_user_id");

            migrationBuilder.RenameColumn(
                name: "PickupUserName",
                table: "PickAndDeliveryTasks",
                newName: "delivery_user_id");
        }
    }
}
