using CourierApp.Server.Models;
using CourierApp.Shared;
using CourierApp.Shared.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CourierApp.Server.Endpoints;

public static class VehicleEndpoints
{
    public static void MapVehicleEndpoints(this WebApplication app)
    {
        app.MapPost("/vehicles/add", async (VehicleDto dto, CourierAppDbContext db) =>
        {
            var exists = await db.Vehicles.AnyAsync((v) => v.VehicleId == dto.VehicleId);
            if (exists) return Results.Conflict("Vehicle already exists!");

            var vehicle = new Vehicle
            {
                VehicleId = dto.VehicleId,
                Brand = dto.Brand,
                Model = dto.Model,
                LicensePlate = dto.LicensePlate,
                PackageCapacity =  dto.PackageCapacity,
            };
            
            db.Vehicles.Add(vehicle);
            await db.SaveChangesAsync();
            
            return Results.Ok(vehicle);
        });

        app.MapGet("/vehicles/{VehicleId}", async (string VehicleId, CourierAppDbContext db) =>
        {
            var vehicle = await db.Vehicles.FindAsync(VehicleId);
            return vehicle == null ? Results.NotFound() : Results.Ok(vehicle);
        });

        app.MapGet("/vehicles/", async (CourierAppDbContext db) =>
        {
            List<Vehicle> vehicles = await db.Vehicles.ToListAsync();
            return Results.Ok(vehicles);
        });
    }
}