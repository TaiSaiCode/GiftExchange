﻿// <auto-generated />
using System;
using GiftExchange.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GiftExchangeServer.Migrations
{
    [DbContext(typeof(GiftExchangeDbContext))]
    [Migration("20230427201103_SeededSomeDataToDatabase")]
    partial class SeededSomeDataToDatabase
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("GiftExchange.Data.Entities.Gift", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdGroup")
                        .HasColumnType("int");

                    b.Property<int>("IdUser")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Price")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdGroup", "IdUser");

                    b.ToTable("Gifts");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Souliers de marche de montagne Keen pour homme.  Taille 9.  Couleur gris et brun.",
                            IdGroup = 1,
                            IdUser = 1,
                            Name = "Souliers Keen pour homme",
                            Price = "129.99$",
                            Priority = 1
                        },
                        new
                        {
                            Id = 2,
                            Description = "Tournee d'adieu du groupe iconique rock Depeche Mode.  Un pot-pourri de leurs plus gros succes des 20 dernieres annees!",
                            IdGroup = 1,
                            IdUser = 1,
                            Name = "Paire de billets pour Depeche Mode au centre Bell",
                            Price = "650.00$",
                            Priority = 2
                        },
                        new
                        {
                            Id = 3,
                            Description = "Carte cadeau pour 2 au Strom Spa de Sherbrooke.  En soiree seulement",
                            IdGroup = 1,
                            IdUser = 1,
                            Name = "Paire de billes Strom-Spa",
                            Price = "250.00$",
                            Priority = 3
                        });
                });

            modelBuilder.Entity("GiftExchange.Data.Entities.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DrawDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Groups");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Groupe initial cree par les concepteurs de Gift-XChange",
                            DrawDate = "",
                            ImageUrl = "https://www.splashimages.com/58hdoie9",
                            Name = "Les Petites Baleines Bleues, l'Original"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Groupe initial cree par les concepteurs de Gift-XChange",
                            DrawDate = "27/04/2023",
                            ImageUrl = "https://www.splashimages.com/58hdoie9",
                            Name = "Les Petites Baleines Bleues, take 2"
                        });
                });

            modelBuilder.Entity("GiftExchange.Data.Entities.GroupUser", b =>
                {
                    b.Property<int>("IdGroup")
                        .HasColumnType("int")
                        .HasColumnOrder(0);

                    b.Property<int>("IdUser")
                        .HasColumnType("int")
                        .HasColumnOrder(1);

                    b.Property<int?>("IdDrawnUser")
                        .HasColumnType("int")
                        .HasColumnOrder(2);

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("bit");

                    b.HasKey("IdGroup", "IdUser");

                    b.HasIndex("IdDrawnUser");

                    b.HasIndex("IdUser");

                    b.ToTable("GroupUsers");

                    b.HasData(
                        new
                        {
                            IdGroup = 1,
                            IdUser = 1,
                            IsAdmin = false
                        },
                        new
                        {
                            IdGroup = 1,
                            IdUser = 2,
                            IsAdmin = false
                        });
                });

            modelBuilder.Entity("GiftExchange.Data.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsSuperAdmin")
                        .HasColumnType("bit");

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "holabruno@gmail.com",
                            Firstname = "Bruno",
                            IsSuperAdmin = true,
                            Lastname = "Theoret",
                            Password = "asdf1234!",
                            Username = "holabruno"
                        },
                        new
                        {
                            Id = 2,
                            Email = "Tomtran94@hotmail.com",
                            Firstname = "Tom",
                            IsSuperAdmin = true,
                            Lastname = "Tran",
                            Password = "asdf1234!",
                            Username = "tom"
                        },
                        new
                        {
                            Id = 3,
                            Email = "adellafranck3000@gmail.com",
                            Firstname = "Franck Della",
                            IsSuperAdmin = true,
                            Lastname = "Amegnignon",
                            Password = "asdf1234!",
                            Username = "adm_franck"
                        },
                        new
                        {
                            Id = 4,
                            Email = "nikomm2016@outlook.com",
                            Firstname = "Nicolas",
                            IsSuperAdmin = true,
                            Lastname = "Mathieu",
                            Password = "asdf1234!",
                            Username = "nicolas"
                        },
                        new
                        {
                            Id = 5,
                            Email = "etienno.robert@hotmail.com",
                            Firstname = "Etienne",
                            IsSuperAdmin = true,
                            Lastname = "Robert",
                            Password = "etienne",
                            Username = "etienne"
                        },
                        new
                        {
                            Id = 6,
                            Email = "joey.mallet@hotmail.com",
                            Firstname = "Joey",
                            IsSuperAdmin = true,
                            Lastname = "Mallet",
                            Password = "asdf1234!",
                            Username = "joey"
                        });
                });

            modelBuilder.Entity("GiftExchange.Data.Entities.Gift", b =>
                {
                    b.HasOne("GiftExchange.Data.Entities.GroupUser", "GroupUser")
                        .WithMany()
                        .HasForeignKey("IdGroup", "IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GroupUser");
                });

            modelBuilder.Entity("GiftExchange.Data.Entities.GroupUser", b =>
                {
                    b.HasOne("GiftExchange.Data.Entities.User", "DrawnUser")
                        .WithMany()
                        .HasForeignKey("IdDrawnUser");

                    b.HasOne("GiftExchange.Data.Entities.Group", "Group")
                        .WithMany()
                        .HasForeignKey("IdGroup")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GiftExchange.Data.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DrawnUser");

                    b.Navigation("Group");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
