using CourierApp.Server.Models;

namespace CourierApp.Server.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        app.MapPost("/api/auth/register", async (RegisterDto dto, UserDbContext db) =>
        {
            // logic
        });

        app.MapPost("/api/auth/login", async (LoginDto dto, UserDbContext db) =>
        {
            // logic
        });
    }
}