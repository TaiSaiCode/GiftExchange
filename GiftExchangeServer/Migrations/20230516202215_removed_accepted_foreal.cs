using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiftExchangeServer.Migrations
{
    /// <inheritdoc />
    public partial class removed_accepted_foreal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accepted",
                table: "PendingInvitation");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "kmCY2YxJD82Ifu0lhHqawRQ5+WCEALK/sCsN6+Z8jRQ3RyPx");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "F9ofUvbm+2fJ/fsSTDwBgyihcOfTIlKuIkBeGFrk/rxELhKK");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "lcsFUaZiF0n/EurMq7HpakwBYJNdG9EmKSF9OIG7BF9I/aCQ");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Password",
                value: "H/ANm7lkJZXI0XGdeZQbM+eOq0YrCp1WxfTvk3ioKXtYIWOj");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "Password",
                value: "Kp7wGjQUkKVT6TAe5CpjrOaEvC2d4NQ0RKfibv2S2OKlZN24");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "Password",
                value: "54hW2QmHTRH/is+Rhc+WiQlkf04KgdQnSrotldm8X/DHij7z");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Accepted",
                table: "PendingInvitation",
                type: "bit",
                nullable: true);

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
    }
}
