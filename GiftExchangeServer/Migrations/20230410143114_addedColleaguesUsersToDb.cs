using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GiftExchangeServer.Migrations
{
    /// <inheritdoc />
    public partial class addedColleaguesUsersToDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Firstname", "Lastname", "Password", "Username" },
                values: new object[,]
                {
                    { 3, "Tomtran94@hotmail.com", "Tom", "Tran", "asdf1234", "tom" },
                    { 4, "adellafranck3000@gmail.com", "Franck Della", "Amegnignon", "asdf1234", "franck" },
                    { 5, "nikomm2016@outlook.com", "Nicolas", "Mathieu", "asdf1234", "nicolas" },
                    { 6, "adellafranck3000@gmail.com", "Franck Della", "Amegnignon", "asdf1234", "franck" },
                    { 7, "etienno.robert@hotmail.com", "Etienne", "Robert", "asdf1234", "etienne" },
                    { 8, "joey.mallet@hotmail.com", "Joey", "Mallet", "asdf1234", "joey" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8);
        }
    }
}
