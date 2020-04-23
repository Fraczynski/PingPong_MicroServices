using Microsoft.EntityFrameworkCore.Migrations;

namespace OpeningHours_Service.Migrations
{
    public partial class OpeningHoursOpenField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Open",
                table: "OpeningHours",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Open",
                table: "OpeningHours");
        }
    }
}
