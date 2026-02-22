using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GymLog.Api.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialExercises : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "Description", "MediaUrl", "Name", "UserId" },
                values: new object[,]
                {
                    { new Guid("018da72d-1234-7000-8000-000000000001"), "A basic exercise for developing the pectoral muscles, triceps and anterior deltoids.", null, "Bench Press", null },
                    { new Guid("018da72d-1234-7000-8000-000000000002"), "A fundamental exercise for the leg and core muscles.", null, "Barbell squats", null },
                    { new Guid("018da72d-1234-7000-8000-000000000003"), "An exercise to develop back, leg muscles and grip strength.", null, "Deadlift", null },
                    { new Guid("018da72d-1234-7000-8000-000000000004"), "The best bodyweight exercise for the back and biceps muscles.", null, "Pull-ups", null },
                    { new Guid("018da72d-1234-7000-8000-000000000005"), "Standing barbell press for shoulder girdle development.", null, "Military press", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: new Guid("018da72d-1234-7000-8000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: new Guid("018da72d-1234-7000-8000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: new Guid("018da72d-1234-7000-8000-000000000003"));

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: new Guid("018da72d-1234-7000-8000-000000000004"));

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: new Guid("018da72d-1234-7000-8000-000000000005"));
        }
    }
}
