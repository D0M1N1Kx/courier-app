using CourierApp.Server.Models;
using CourierApp.Shared;
using CourierApp.Shared.DTOs;

namespace CourierApp.Server.Endpoints;

public static class WorkEndpoints
{
    public static void MapWorkEndpoints(this WebApplication app)
    {
        app.MapPost("/work/start", async (WorkStartDto dto, CourierAppDbContext db) =>
        {
            var user = await db.Users.FindAsync(dto.UserId);
            if (user == null) return Results.NotFound("User not found!");

            var work = new Work
            {
                UserId = user.Id,
                PackageCount = dto.PackageCount,
                PricePerPackage = dto.PricePerPackage,
                StartTime = DateTime.UtcNow,
            };
            
            db.Works.Add(work);
            await db.SaveChangesAsync();
            
            return Results.Ok(new WorkResponseDto
            {
                Id = work.Id,
                UserId = work.UserId,
                PackageCount = work.PackageCount,
                PricePerPackage = work.PricePerPackage,
                TotalEarned = work.TotalEarned,
                StartTime = work.StartTime,
                IsCompleted = work.IsCompleted
            });
        });
    }
}