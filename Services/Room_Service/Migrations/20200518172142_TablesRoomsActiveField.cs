using Microsoft.EntityFrameworkCore.Migrations;

namespace Room_Service.Migrations
{
    public partial class TablesRoomsActiveField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Tables",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Rooms",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "Rooms");
        }
    }
}
