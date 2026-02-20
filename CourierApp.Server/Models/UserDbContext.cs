using CourierApp.Shared;
using Microsoft.EntityFrameworkCore;

namespace CourierApp.Server.Models;

public class UserDbContext : DbContext
{
    public UserDbContext(DbContextOptions options) : base(options) {}
    
    public DbSet<User> Users { get; set; }
}