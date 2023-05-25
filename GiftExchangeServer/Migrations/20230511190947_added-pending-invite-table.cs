using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiftExchangeServer.Migrations
{
    /// <inheritdoc />
    public partial class addedpendinginvitetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PendingInvitation",
                columns: table => new
                {
                    IdGroup = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Accepted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PendingInvitation", x => new { x.IdGroup, x.Email });
                    table.ForeignKey(
                        name: "FK_PendingInvitation_Groups_IdGroup",
                        column: x => x.IdGroup,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PendingInvitation");
        }
    }
}
