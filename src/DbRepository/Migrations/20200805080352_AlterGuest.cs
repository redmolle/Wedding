using Microsoft.EntityFrameworkCore.Migrations;

namespace DbRepository.Migrations
{
    public partial class AlterGuest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCanBeInZAGS",
                table: "Guest",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmZAGS",
                table: "Guest",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmed",
                table: "Guest",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCanBeInZAGS",
                table: "Guest");

            migrationBuilder.DropColumn(
                name: "IsConfirmZAGS",
                table: "Guest");

            migrationBuilder.DropColumn(
                name: "IsConfirmed",
                table: "Guest");
        }
    }
}
