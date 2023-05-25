using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiftExchangeServer.Migrations
{
    /// <inheritdoc />
    public partial class test2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "c+54thgsfBsNMA7TDAZgmVoaV4WcE+Do0xMI6OMKg1S4OOZy");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "8zRslfCX4KtZSQhPIvxDjT1nE3r49rWQbe4cR1Hloby2a/Fj");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "m3MMiXKOfnomrsyla3Qxgq3GtrQ2KwjEYr4iPbsUHJ/nAaZG");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Password",
                value: "jk7/RklLZLHl/pYI1MVX+PCjQ9fVoIDMd7PeGJvsftjPMlkB");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "Password",
                value: "OvTfqvKpoc6Ko3jXZq9w1qnD/Z8sIDq9hQYtk4nwEF1tjNE7");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "Password",
                value: "H9hCM7E4Nwu3kfPzLemKr7UOqYfV0dH3DxUYrO5r5HUyO+Qi");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
