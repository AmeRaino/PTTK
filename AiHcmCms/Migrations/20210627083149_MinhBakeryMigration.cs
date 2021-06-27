using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AiHcmCms.Migrations
{
    public partial class MinhBakeryMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 124, nullable: true),
                    LastName = table.Column<string>(maxLength: 124, nullable: true),
                    Username = table.Column<string>(maxLength: 124, nullable: true),
                    Password = table.Column<string>(maxLength: 124, nullable: true),
                    CreatedDate = table.Column<long>(nullable: false),
                    Email = table.Column<string>(maxLength: 124, nullable: true),
                    Phone = table.Column<string>(maxLength: 15, nullable: true),
                    Avatar = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(maxLength: 124, nullable: true),
                    Name = table.Column<string>(maxLength: 124, nullable: true),
                    Password = table.Column<string>(maxLength: 124, nullable: true),
                    Email = table.Column<string>(maxLength: 100, nullable: true),
                    Phone = table.Column<string>(maxLength: 15, nullable: true),
                    Address = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cake",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IdCategory = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 250, nullable: true),
                    Price = table.Column<float>(nullable: false),
                    Discount = table.Column<float>(nullable: false),
                    Amount = table.Column<int>(nullable: false),
                    Avatar = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cake", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Cake_Category_IdCategory",
                        column: x => x.IdCategory,
                        principalTable: "Category",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 124, nullable: false),
                    CreatedDate = table.Column<long>(nullable: false),
                    Total = table.Column<float>(nullable: false),
                    IdCustomer = table.Column<int>(nullable: false),
                    ShippingAdress = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Order_Customer_IdCustomer",
                        column: x => x.IdCustomer,
                        principalTable: "Customer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetail",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 124, nullable: false),
                    IdOrder = table.Column<string>(maxLength: 124, nullable: true),
                    IdProduct = table.Column<int>(nullable: false),
                    Price = table.Column<float>(nullable: false),
                    Amount = table.Column<int>(nullable: false),
                    Total = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderDetail_Order_IdOrder",
                        column: x => x.IdOrder,
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderDetail_Cake_IdProduct",
                        column: x => x.IdProduct,
                        principalTable: "Cake",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cake_IdCategory",
                table: "Cake",
                column: "IdCategory");

            migrationBuilder.CreateIndex(
                name: "IX_Order_IdCustomer",
                table: "Order",
                column: "IdCustomer");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_IdOrder",
                table: "OrderDetail",
                column: "IdOrder");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetail_IdProduct",
                table: "OrderDetail",
                column: "IdProduct");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "OrderDetail");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Cake");

            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
