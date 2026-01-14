using DispatchAI.Api.Domain;
using DispatchAI.Api.Dto;
using DispatchAI.Api.Infra;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DispatchAI.Api.Endpoints;

public static class LogisticsEndpoints
{
    public static IEndpointRouteBuilder MapLogisticsEndpoints(this IEndpointRouteBuilder app)
    {
        var deliveries = app.MapGroup("/deliveries");
        deliveries.RequireAuthorization();

        deliveries.MapGet("/", [Authorize(Roles = RoleNames.Dispatcher)] async (AppDbContext db) =>
        {
            var items = await db.Deliveries
                .Include(d => d.Route)
                .Include(d => d.Incidents)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();

            return Results.Ok(items.Select(d => d.ToResponse()));
        });

        deliveries.MapGet("/{id:guid}", [Authorize] async (Guid id, AppDbContext db) =>
        {
            var delivery = await db.Deliveries
                .Include(d => d.Route)
                .Include(d => d.Incidents)
                .FirstOrDefaultAsync(d => d.Id == id);

            return delivery is null ? Results.NotFound() : Results.Ok(delivery.ToResponse());
        });

        deliveries.MapPost("/", [Authorize(Roles = RoleNames.Dispatcher)] async (
            DeliveryCreateRequest request,
            AppDbContext db) =>
        {
            if (!DeliveryStatus.IsValid(DeliveryStatus.Pending))
            {
                return Results.BadRequest(new { error = "Invalid delivery status." });
            }

            var delivery = new Delivery
            {
                Code = $"DLV-{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}",
                OriginAddress = request.OriginAddress,
                OriginLat = request.Origin.Latitude,
                OriginLng = request.Origin.Longitude,
                DestinationAddress = request.DestinationAddress,
                DestinationLat = request.Destination.Latitude,
                DestinationLng = request.Destination.Longitude,
                Status = DeliveryStatus.Pending,
                ScheduledStart = request.ScheduledStart,
                ScheduledEnd = request.ScheduledEnd,
                Notes = request.Notes
            };

            db.Deliveries.Add(delivery);
            await db.SaveChangesAsync();

            return Results.Created($"/deliveries/{delivery.Id}", delivery.ToResponse());
        });

        deliveries.MapPut("/{id:guid}", [Authorize(Roles = RoleNames.Dispatcher)] async (
            Guid id,
            DeliveryUpdateRequest request,
            AppDbContext db) =>
        {
            if (!DeliveryStatus.IsValid(request.Status))
            {
                return Results.BadRequest(new { error = "Invalid status." });
            }

            var delivery = await db.Deliveries.Include(d => d.Route).FirstOrDefaultAsync(d => d.Id == id);
            if (delivery is null)
            {
                return Results.NotFound();
            }

            delivery.OriginAddress = request.OriginAddress;
            delivery.OriginLat = request.Origin.Latitude;
            delivery.OriginLng = request.Origin.Longitude;
            delivery.DestinationAddress = request.DestinationAddress;
            delivery.DestinationLat = request.Destination.Latitude;
            delivery.DestinationLng = request.Destination.Longitude;
            delivery.ScheduledStart = request.ScheduledStart;
            delivery.ScheduledEnd = request.ScheduledEnd;
            delivery.Notes = request.Notes;
            delivery.Status = request.Status;
            delivery.UpdatedAt = DateTimeOffset.UtcNow;

            await db.SaveChangesAsync();
            return Results.Ok(delivery.ToResponse());
        });

        deliveries.MapPost("/{id:guid}/assign", [Authorize(Roles = RoleNames.Dispatcher)] async (
            Guid id,
            AssignDriverRequest request,
            AppDbContext db,
            UserManager<AppUser> userManager) =>
        {
            var delivery = await db.Deliveries.FirstOrDefaultAsync(d => d.Id == id);
            if (delivery is null)
            {
                return Results.NotFound();
            }

            var user = await userManager.FindByIdAsync(request.DriverId);
            if (user is null)
            {
                return Results.BadRequest(new { error = "Driver not found." });
            }

            var roles = await userManager.GetRolesAsync(user);
            if (!roles.Contains(RoleNames.Driver))
            {
                return Results.BadRequest(new { error = "User is not a driver." });
            }

            delivery.DriverId = request.DriverId;
            delivery.UpdatedAt = DateTimeOffset.UtcNow;
            await db.SaveChangesAsync();

            return Results.Ok(delivery.ToResponse());
        });

        deliveries.MapPost("/{id:guid}/status", [Authorize] async (
            Guid id,
            ChangeDeliveryStatusRequest request,
            ClaimsPrincipal user,
            AppDbContext db) =>
        {
            if (!DeliveryStatus.IsValid(request.Status))
            {
                return Results.BadRequest(new { error = "Invalid status." });
            }

            var delivery = await db.Deliveries.FirstOrDefaultAsync(d => d.Id == id);
            if (delivery is null)
            {
                return Results.NotFound();
            }

            var isDriver = user.IsInRole(RoleNames.Driver);
            if (isDriver && delivery.DriverId != user.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Results.Forbid();
            }

            delivery.Status = request.Status;
            delivery.UpdatedAt = DateTimeOffset.UtcNow;
            await db.SaveChangesAsync();

            return Results.Ok(delivery.ToResponse());
        });

        deliveries.MapPost("/{id:guid}/incidents", [Authorize] async (
            Guid id,
            IncidentCreateRequest request,
            ClaimsPrincipal user,
            AppDbContext db) =>
        {
            if (id != request.DeliveryId)
            {
                return Results.BadRequest(new { error = "Mismatched delivery id." });
            }

            var delivery = await db.Deliveries.FirstOrDefaultAsync(d => d.Id == id);
            if (delivery is null)
            {
                return Results.NotFound();
            }

            var isDriver = user.IsInRole(RoleNames.Driver);
            if (isDriver && delivery.DriverId != user.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Results.Forbid();
            }

            var incident = new Incident
            {
                DeliveryId = id,
                Type = request.Type,
                Description = request.Description,
                CreatedAt = DateTimeOffset.UtcNow
            };

            db.Incidents.Add(incident);
            await db.SaveChangesAsync();

            return Results.Created($"/deliveries/{id}/incidents/{incident.Id}", incident);
        });

        var drivers = app.MapGroup("/drivers");
        drivers.RequireAuthorization();

        drivers.MapPost("/location", [Authorize(Roles = RoleNames.Driver)] async (
            DriverLocationUpdateRequest request,
            ClaimsPrincipal user,
            AppDbContext db) =>
        {
            var driverId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (driverId is null)
            {
                return Results.BadRequest(new { error = "Driver id not found in token." });
            }

            var location = new DriverLocation
            {
                DriverId = driverId,
                Latitude = request.Latitude,
                Longitude = request.Longitude,
                RecordedAt = DateTimeOffset.UtcNow
            };

            db.DriverLocations.Add(location);
            await db.SaveChangesAsync();

            return Results.Ok(new DriverLocationResponse(location.Latitude, location.Longitude, location.RecordedAt));
        });

        drivers.MapGet("/{driverId}/locations", [Authorize(Roles = RoleNames.Dispatcher)] async (
            string driverId,
            int? take,
            AppDbContext db) =>
        {
            var limit = Math.Clamp(take ?? 50, 1, 500);
            var history = await db.DriverLocations
                .Where(x => x.DriverId == driverId)
                .OrderByDescending(x => x.RecordedAt)
                .Take(limit)
                .ToListAsync();

            return Results.Ok(history.Select(x => new DriverLocationResponse(x.Latitude, x.Longitude, x.RecordedAt)));
        });

        return app;
    }
}
