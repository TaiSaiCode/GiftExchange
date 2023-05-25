using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GiftExchangeServer.Migrations
{
    /// <inheritdoc />
    public partial class updatedUsersOnModelCreating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Email", "Username" },
                values: new object[] { "holabruno@gmail.com", "holabruno" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Email", "Firstname", "Lastname", "Username" },
                values: new object[] { "Tomtran94@hotmail.com", "Tom", "Tran", "tom" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Email", "Firstname", "Lastname", "Username" },
                values: new object[] { "adellafranck3000@gmail.com", "Franck Della", "Amegnignon", "adm_franck" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Email", "Firstname", "Lastname", "Username" },
                values: new object[] { "nikomm2016@outlook.com", "Nicolas", "Mathieu", "nicolas" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Email", "Firstname", "Lastname", "Username" },
                values: new object[] { "etienno.robert@hotmail.com", "Etienne", "Robert", "etienne" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Email", "Firstname", "Lastname", "Username" },
                values: new object[] { "joey.mallet@hotmail.com", "Joey", "Mallet", "joey" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Email", "Username" },
                values: new object[] { "randmax7@hotmail.com", "randmax" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Email", "Firstname", "Lastname", "Username" },
                values: new object[] { "holabruno@gmail.com", "Bruno", "Theoret", "holabruno" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Email", "Firstname", "Lastname", "Username" },
                values: new object[] { "Tomtran94@hotmail.com", "Tom", "Tran", "tom" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Email", "Firstname", "Lastname", "Username" },
                values: new object[] { "adellafranck3000@gmail.com", "Franck Della", "Amegnignon", "franck" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Email", "Firstname", "Lastname", "Username" },
                values: new object[] { "nikomm2016@outlook.com", "Nicolas", "Mathieu", "nicolas" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Email", "Firstname", "Lastname", "Username" },
                values: new object[] { "adellafranck3000@gmail.com", "Franck Della", "Amegnignon", "franck" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Firstname", "Lastname", "Password", "Username" },
                values: new object[,]
                {
                    { 7, "etienno.robert@hotmail.com", "Etienne", "Robert", "asdf1234", "etienne" },
                    { 8, "joey.mallet@hotmail.com", "Joey", "Mallet", "asdf1234", "joey" }
                });
        }
    }
}
