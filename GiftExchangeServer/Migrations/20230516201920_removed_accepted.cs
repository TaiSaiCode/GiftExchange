using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiftExchangeServer.Migrations
{
    /// <inheritdoc />
    public partial class removed_accepted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "4PLKVogOevNr1rIxvRJe+vkWkzUiqljj1EUb0aJMS+PddkM3");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "Msme5Or0WYfOMkb5AWa8e9oBH4XJPgkaLzgU9Z9qVABHxUON");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "Ga11KZyyaxuupahhJTAZA+1vufRMjGqiYyZBiE9p/Gkq5iDb");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Password",
                value: "apJ0suYJ+Ia+DqF1rCG0iJwfvTvDUQ8m0KvNzqpZIVi4WsKY");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "Password",
                value: "wBR6EV+B1oDPsJ20cNH/QRzc19FIZuBRcyXgL48SjShouiaA");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "Password",
                value: "ZY1/BQIDvb/k4+NeO3/mvn4sYctX6GTgHXfcdn8Rlm1tgddW");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
