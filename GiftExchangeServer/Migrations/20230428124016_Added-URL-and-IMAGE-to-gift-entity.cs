using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiftExchangeServer.Migrations
{
    /// <inheritdoc />
    public partial class AddedURLandIMAGEtogiftentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Gifts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Gifts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Gifts");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Gifts");
        }
    }
}
