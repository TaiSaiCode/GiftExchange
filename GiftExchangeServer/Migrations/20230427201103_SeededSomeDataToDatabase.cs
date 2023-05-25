using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GiftExchangeServer.Migrations
{
    /// <inheritdoc />
    public partial class SeededSomeDataToDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Groups",
                columns: new[] { "Id", "Description", "DrawDate", "ImageUrl", "Name" },
                values: new object[,]
                {
                    { 1, "Groupe initial cree par les concepteurs de Gift-XChange", "", "https://www.splashimages.com/58hdoie9", "Les Petites Baleines Bleues, l'Original" },
                    { 2, "Groupe initial cree par les concepteurs de Gift-XChange", "27/04/2023", "https://www.splashimages.com/58hdoie9", "Les Petites Baleines Bleues, take 2" }
                });

            migrationBuilder.InsertData(
                table: "GroupUsers",
                columns: new[] { "IdGroup", "IdUser", "IdDrawnUser", "IsAdmin" },
                values: new object[,]
                {
                    { 1, 1, null, false },
                    { 1, 2, null, false }
                });

            migrationBuilder.InsertData(
                table: "Gifts",
                columns: new[] { "Id", "Description", "IdGroup", "IdUser", "Name", "Price", "Priority" },
                values: new object[,]
                {
                    { 1, "Souliers de marche de montagne Keen pour homme.  Taille 9.  Couleur gris et brun.", 1, 1, "Souliers Keen pour homme", "129.99$", 1 },
                    { 2, "Tournee d'adieu du groupe iconique rock Depeche Mode.  Un pot-pourri de leurs plus gros succes des 20 dernieres annees!", 1, 1, "Paire de billets pour Depeche Mode au centre Bell", "650.00$", 2 },
                    { 3, "Carte cadeau pour 2 au Strom Spa de Sherbrooke.  En soiree seulement", 1, 1, "Paire de billes Strom-Spa", "250.00$", 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Gifts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Gifts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Gifts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "GroupUsers",
                keyColumns: new[] { "IdGroup", "IdUser" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "GroupUsers",
                keyColumns: new[] { "IdGroup", "IdUser" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
