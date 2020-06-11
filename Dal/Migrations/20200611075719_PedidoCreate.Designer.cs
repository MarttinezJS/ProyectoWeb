﻿// <auto-generated />
using System;
using Dal;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Dal.Migrations
{
    [DbContext(typeof(CarniceriaContext))]
    [Migration("20200611075719_PedidoCreate")]
    partial class PedidoCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Entity.DetallePedido", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Cantidad")
                        .HasColumnType("int");

                    b.Property<string>("PedidoId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Presentacion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductoId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<float>("SubTotal")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("PedidoId");

                    b.HasIndex("ProductoId");

                    b.ToTable("DetallesPedido");
                });

            modelBuilder.Entity("Entity.Pedido", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ClienteId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("datetime2");

                    b.Property<float>("Total")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.ToTable("Pedidos");
                });

            modelBuilder.Entity("Entity.Producto", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Precio")
                        .HasColumnType("int");

                    b.Property<string>("Presentacion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Proveedor")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Productos");
                });

            modelBuilder.Entity("Entity.Usuario", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Direccion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefono")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("Entity.DetallePedido", b =>
                {
                    b.HasOne("Entity.Pedido", null)
                        .WithMany("DetallePedido")
                        .HasForeignKey("PedidoId");

                    b.HasOne("Entity.Producto", "Producto")
                        .WithMany()
                        .HasForeignKey("ProductoId");
                });

            modelBuilder.Entity("Entity.Pedido", b =>
                {
                    b.HasOne("Entity.Usuario", "Cliente")
                        .WithMany()
                        .HasForeignKey("ClienteId");
                });
#pragma warning restore 612, 618
        }
    }
}
