using Microsoft.EntityFrameworkCore.Migrations;

namespace DbRepository.Migrations
{
    public partial class AlterGuest2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsConfirmZAGS",
                table: "Guest");

            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmedZAGS",
                table: "Guest",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsConfirmedZAGS",
                table: "Guest");

            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmZAGS",
                table: "Guest",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
