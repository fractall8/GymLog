using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymLog.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkoutSetsTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Sets",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Sets");
        }
    }
}
