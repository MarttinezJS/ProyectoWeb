using Microsoft.EntityFrameworkCore.Migrations;

namespace Dal.Migrations
{
    public partial class fechaInicioCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fecha",
                table: "Pedidos");

            migrationBuilder.AddColumn<string>(
                name: "FechaFin",
                table: "Pedidos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FechaInicio",
                table: "Pedidos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FechaFin",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "FechaInicio",
                table: "Pedidos");

            migrationBuilder.AddColumn<string>(
                name: "Fecha",
                table: "Pedidos",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
