using CourierApp.Server.Dtos;
using CourierApp.Server.Models;
using CourierApp.Shared.DTOs;
using Microsoft.EntityFrameworkCore;
using CourierApp.Shared;
using Microsoft.AspNetCore.SignalR;

namespace CourierApp.Server.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        app.MapPost("auth/register", async (RegisterDto dto, CourierAppDbContext db) =>
        {
            var exists = await db.Users.AnyAsync(u => u.Email == dto.Email);
            if (exists)
                return Results.Conflict("This email is already registered!");

            var user = new User
            {
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                IsAdmin = false,
                IsApproved = false
            };

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return Results.Created($"/api/users/{user.Id}", new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsAdmin = user.IsAdmin,
                IsApproved = user.IsApproved
            });
        });

        app.MapPost("auth/login", async (LoginDto dto, CourierAppDbContext db) =>
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Results.Unauthorized();

            return Results.Ok(new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsAdmin = user.IsAdmin,
                IsApproved = user.IsApproved,
                VehicleId = user.VehicleId
            });
        });
        
        app.MapPut("auth/users/{userId}/vehicle", async (int userId, string vehicleId, CourierAppDbContext db) =>
        {
            var user = await db.Users.FindAsync(userId);
            if (user == null)
                return Results.NotFound("User not found!");
            
            var vehicle = await db.Vehicles.FindAsync(vehicleId);
            if (vehicle == null)
                return Results.NotFound("Vehicle not found!");

            user.VehicleId = vehicleId;
            await db.SaveChangesAsync();

            return Results.Ok();
        });

        app.MapGet("auth/users/{userId}", async (int userId, CourierAppDbContext db) =>
        {
            var user = await db.Users.FindAsync(userId);
            if (user == null) return Results.NotFound();

            return Results.Ok(new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsAdmin = user.IsAdmin,
                IsApproved = user.IsApproved,
                VehicleId = user.VehicleId
            });
        });

        app.MapGet("auth/users/", async (CourierAppDbContext db) =>
        {
            var users = await db.Users.Select(u => new UserResponseDto
            {
                Id = u.Id,
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                IsAdmin = u.IsAdmin,
                IsApproved = u.IsApproved,
                VehicleId = u.VehicleId
            }).ToListAsync();
    
            return Results.Ok(users);
        });

        app.MapPut("auth/users/{userId}/approve/{boolean}", async (int userId, bool boolean,CourierAppDbContext db) =>
        {
            var user = await db.Users.FindAsync(userId);
            if (user == null)
                return Results.NotFound();

            user.IsApproved = boolean;
            await db.SaveChangesAsync();

            return Results.Ok();
        });
    }
}