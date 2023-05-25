using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using GiftExchange.Data.Entities;
using GiftExchangeServer.Data.Entities;
using GiftExchangeServer.Utils;
using GiftExchangeServer.JWTUtils;

namespace GiftExchange.Data;

public class GiftExchangeDbContext : DbContext
{
	public GiftExchangeDbContext(DbContextOptions options) : base(options)
	{

	}
	public DbSet<User> Users { get; set; }
	public DbSet<Group> Groups { get; set; }
	public DbSet<GroupUser> GroupUsers { get; set; }
	public DbSet<Gift> Gifts { get; set; }
	public DbSet<PendingInvitation> PendingInvitation { get; set; }

	//On indique que location a trois key
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<GroupUser>().HasKey(a => new { a.IdGroup, a.IdUser });

		modelBuilder.Entity<GroupUser>()
			.HasOne<Group>(gu => gu.Group)
			.WithMany(g => g.GroupUsers)
			.HasForeignKey(gu => gu.IdGroup);

		modelBuilder.Entity<GroupUser>()
			.HasOne<User>(gu => gu.User)
			.WithMany(u => u.GroupUsers)
			.HasForeignKey(gu => gu.IdUser);

		modelBuilder.Entity<GroupUser>()
			.HasOne<User>(gu => gu.DrawnUser)
			.WithMany(g => g.DrawnGroupUsers)
			.HasForeignKey(gu => gu.IdDrawnUser);

		modelBuilder.Entity<PendingInvitation>().HasKey(a => new { a.IdGroup, a.Email });
		modelBuilder.Entity<PendingInvitation>().HasOne<Group>(pi => pi.Group).WithMany(g => g.PendingInvitations).HasForeignKey(pi => pi.IdGroup);

		//Seeding users to database
		modelBuilder.Entity<User>().HasData(

		new User
		{
			Id = 1,
			Username = "holabruno",
			Firstname = "Bruno",
			Lastname = "Theoret",
			Password = PasswordHasher.HashPassword("asdf1234!"),
			Email = "holabruno@gmail.com",
			IsSuperAdmin = true
		},
		new User
		{
			Id = 2,
			Username = "tom",
			Firstname = "Tom",
			Lastname = "Tran",
			Password = PasswordHasher.HashPassword("asdf1234!"),
			Email = "Tomtran94@hotmail.com",
			IsSuperAdmin = true
		},
		new User
		{
			Id = 3,
			Username = "adm_franck",
			Firstname = "Franck Della",
			Lastname = "Amegnignon",
			Password = PasswordHasher.HashPassword("asdf1234!"),
			Email = "adellafranck3000@gmail.com",
			IsSuperAdmin = true
		},
		new User
		{
			Id = 4,
			Username = "nicolas",
			Firstname = "Nicolas",
			Lastname = "Mathieu",
			Password = PasswordHasher.HashPassword("asdf1234!"),
			Email = "nikomm2016@outlook.com",
			IsSuperAdmin = true
		},

		new User
		{
			Id = 5,
			Username = "etienne",
			Firstname = "Etienne",
			Lastname = "Robert",
			Password = PasswordHasher.HashPassword("etienne!"),
			Email = "etienno.robert@hotmail.com",
			IsSuperAdmin = true
		},
		 new User
		 {
			 Id = 6,
			 Username = "joey",
			 Firstname = "Joey",
			 Lastname = "Mallet",
			 Password = PasswordHasher.HashPassword("asdf1234!"),
			 Email = "joey.mallet@hotmail.com",
			 IsSuperAdmin = true
		 }

	);
	}

}