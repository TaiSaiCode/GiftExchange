using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiftExchangeServer.Migrations
{
    /// <inheritdoc />
    public partial class hashing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "dYZ3EAnt+ZvGIkwE9yIXfDsvrHBsjbXJN9BeN5OlaovjaMgX");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "opYoKrwS4ExIc2wtuXGWoKrBPud50CO9WjS2x57aqbF5MoPm");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "ui+EmIUG0DAKaFpncrPTc9hbg7YQ+TwsnYxMUH0NbSZR3sG2");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Password",
                value: "oqfNCM3ZBNmdoygonvZPospo6UhmGgYOE4GQUyiMjE9BECiu");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "Password",
                value: "zujnTOwqj17F73tOHufdFQn6BITkuzHrM7GVebgZG5XlqPek");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "Password",
                value: "ePZDP6TDjemjsUC1eU9Agdg/5PbLMlasZxdb2eorZK9JMyIU");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "asdf1234!");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "asdf1234!");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "asdf1234!");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Password",
                value: "asdf1234!");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "Password",
                value: "etienne!");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "Password",
                value: "asdf1234!");
        }
    }
}
