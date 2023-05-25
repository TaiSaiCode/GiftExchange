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
    [Migration("20230505154254_added bi-directinnality")]
    partial class addedbidirectinnality
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

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Price")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.HasIndex("IdGroup", "IdUser");

                    b.ToTable("Gifts");
                });

            modelBuilder.Entity("GiftExchange.Data.Entities.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Budget")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DrawDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Groups");
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
                            Password = "etienne!",
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

            modelBuilder.Entity("GroupUser", b =>
                {
                    b.Property<int>("GroupsId")
                        .HasColumnType("int");

                    b.Property<int>("UsersId")
                        .HasColumnType("int");

                    b.HasKey("GroupsId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("GroupUser");
                });

            modelBuilder.Entity("GiftExchange.Data.Entities.Gift", b =>
                {
                    b.HasOne("GiftExchange.Data.Entities.User", null)
                        .WithMany("Gifts")
                        .HasForeignKey("UserId");

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

            modelBuilder.Entity("GroupUser", b =>
                {
                    b.HasOne("GiftExchange.Data.Entities.Group", null)
                        .WithMany()
                        .HasForeignKey("GroupsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GiftExchange.Data.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GiftExchange.Data.Entities.User", b =>
                {
                    b.Navigation("Gifts");
                });
#pragma warning restore 612, 618
        }
    }
}