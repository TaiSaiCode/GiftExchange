using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GiftExchangeServer.Migrations
{
    /// <inheritdoc />
    public partial class added_super_admin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSuperAdmin",
                table: "GroupUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "UNuaNPZQsHV9SlmyXekuHGeziWG1VXiPOdnyiLLcCg0erx4X");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "bVenLkNvr9u5fGhD8j3vdEKnV2OqhBoQXRbMQ3lv4OoLaK74");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "GDonWmcCW0+J9Jjx6MOPbLO9XhiLHbyCLY6LLEMvABkiMsnm");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "Password",
                value: "KNj1ak69IAdByQcxiHYxnoSTOEw67TxbzaiBBOSSMw1Kyhvf");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "Password",
                value: "FLJr9NwwoznCE7HE+7y2wIIlnQW87apX3ugpxuaBt1Z2Pc58");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                column: "Password",
                value: "O+oFmJaYdKDfuZ/HphAziwQRGEsgiY1ac5RaqxEIXIO+U2+H");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSuperAdmin",
                table: "GroupUsers");

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
    }
}
