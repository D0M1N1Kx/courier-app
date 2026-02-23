using CourierApp.Server.Models;
using CourierApp.Shared;
using CourierApp.Shared.DTOs;
using Microsoft.EntityFrameworkCore;

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

        app.MapPost("/work/complete/{workId}", async (int workId, IFormFile proof,CourierAppDbContext db) =>
        {
            var work = await db.Works.FindAsync(workId);
            if (work == null) return Results.NotFound("Work not found!");
            if (work.IsCompleted) return Results.Conflict("Work already completed!");
            
            var uploadsDir = Path.Combine("uploads", "works");
            Directory.CreateDirectory(uploadsDir);
            var fileName = $"{workId}_{Guid.NewGuid()}{Path.GetExtension(proof.FileName)}";
            var filePath = Path.Combine(uploadsDir, fileName);
            
            var stream = File.Create(filePath);
            await proof.CopyToAsync(stream);
            
            work.EndTime = DateTime.UtcNow;
            work.ProofImagePath = fileName;
            await db.SaveChangesAsync();
            
            return Results.Ok(new WorkResponseDto
            {
                Id = work.Id,
                UserId = work.UserId,
                PackageCount = work.PackageCount,
                PricePerPackage = work.PricePerPackage,
                TotalEarned = work.TotalEarned,
                StartTime = work.StartTime,
                EndTime = work.EndTime,
                IsCompleted = work.IsCompleted,
                ProofImagePath = work.ProofImagePath
            });
        }).DisableAntiforgery();

        app.MapGet("/work/user/{userId}", async (int userId, CourierAppDbContext db) =>
        {
            var works = await db.Works.Where(w => w.UserId == userId).Select(w => new WorkResponseDto
            {
                Id = w.Id,
                UserId = w.UserId,
                PackageCount = w.PackageCount,
                PricePerPackage = w.PricePerPackage,
                TotalEarned = w.PackageCount * w.PricePerPackage,
                StartTime = w.StartTime,
                EndTime = w.EndTime,
                IsCompleted = w.EndTime.HasValue
            }).ToListAsync();
            
            return Results.Ok(works);
        });
    }
}