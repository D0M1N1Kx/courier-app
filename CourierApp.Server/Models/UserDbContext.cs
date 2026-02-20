using CourierApp.Shared;
using Microsoft.EntityFrameworkCore;

namespace CourierApp.Server.Models;

public class CourierAppDbContext : DbContext
{
    public CourierAppDbContext(DbContextOptions options) : base(options) {}
    
    public DbSet<User> Users { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
}