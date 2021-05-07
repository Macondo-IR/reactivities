using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations.Poem
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Poets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PoetMasterpieces",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PoetId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoetMasterpieces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PoetMasterpieces_Poets_PoetId",
                        column: x => x.PoetId,
                        principalTable: "Poets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PoemIndices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PoetMasterpieceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PoemIndexId = table.Column<int>(type: "int", nullable: false),
                    BookId = table.Column<int>(type: "int", nullable: true),
                    ParentTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MainTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MainUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoemIndices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PoemIndices_PoetMasterpieces_PoetMasterpieceId",
                        column: x => x.PoetMasterpieceId,
                        principalTable: "PoetMasterpieces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Poems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PoemIndexId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SortId = table.Column<int>(type: "int", nullable: false),
                    PoemId = table.Column<int>(type: "int", nullable: true),
                    Vorder = table.Column<int>(type: "int", nullable: true),
                    Position = table.Column<int>(type: "int", nullable: true),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Poems_PoemIndices_PoemIndexId",
                        column: x => x.PoemIndexId,
                        principalTable: "PoemIndices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PoemIndices_PoetMasterpieceId",
                table: "PoemIndices",
                column: "PoetMasterpieceId");

            migrationBuilder.CreateIndex(
                name: "IX_Poems_PoemIndexId",
                table: "Poems",
                column: "PoemIndexId");

            migrationBuilder.CreateIndex(
                name: "IX_PoetMasterpieces_PoetId",
                table: "PoetMasterpieces",
                column: "PoetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Poems");

            migrationBuilder.DropTable(
                name: "PoemIndices");

            migrationBuilder.DropTable(
                name: "PoetMasterpieces");

            migrationBuilder.DropTable(
                name: "Poets");
        }
    }
}
