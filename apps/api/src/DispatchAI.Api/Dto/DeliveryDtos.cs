using System.ComponentModel.DataAnnotations;
using DispatchAI.Api.Domain;

namespace DispatchAI.Api.Dto;

public sealed record LatLon(double Latitude, double Longitude);

public sealed record DeliveryCreateRequest(
    [Required] string OriginAddress,
    LatLon Origin,
    [Required] string DestinationAddress,
    LatLon Destination,
    DateTimeOffset? ScheduledStart,
    DateTimeOffset? ScheduledEnd,
    string? Notes
);

public sealed record DeliveryUpdateRequest(
    [Required] string OriginAddress,
    LatLon Origin,
    [Required] string DestinationAddress,
    LatLon Destination,
    DateTimeOffset? ScheduledStart,
    DateTimeOffset? ScheduledEnd,
    string? Notes,
    string Status
);

public sealed record AssignDriverRequest(string DriverId);
public sealed record ChangeDeliveryStatusRequest(string Status, string? Reason);

public sealed record IncidentCreateRequest(Guid DeliveryId, string Type, string Description);

public sealed record DeliveryResponse(
    Guid Id,
    string Code,
    string OriginAddress,
    LatLon Origin,
    string DestinationAddress,
    LatLon Destination,
    string Status,
    string? DriverId,
    DateTimeOffset? ScheduledStart,
    DateTimeOffset? ScheduledEnd,
    string? Notes,
    RouteInfoResponse? Route,
    IReadOnlyCollection<IncidentResponse> Incidents,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt
);

public sealed record RouteInfoResponse(
    double DistanceMeters,
    double DurationSeconds,
    string? Geometry,
    DateTimeOffset UpdatedAt
);

public sealed record IncidentResponse(
    Guid Id,
    string Type,
    string Description,
    DateTimeOffset CreatedAt
);

public sealed record DriverLocationUpdateRequest(double Latitude, double Longitude);
public sealed record DriverLocationResponse(double Latitude, double Longitude, DateTimeOffset RecordedAt);

public static class DeliveryMappings
{
    public static DeliveryResponse ToResponse(this Delivery delivery)
    {
        return new DeliveryResponse(
            delivery.Id,
            delivery.Code,
            delivery.OriginAddress,
            new LatLon(delivery.OriginLat, delivery.OriginLng),
            delivery.DestinationAddress,
            new LatLon(delivery.DestinationLat, delivery.DestinationLng),
            delivery.Status,
            delivery.DriverId,
            delivery.ScheduledStart,
            delivery.ScheduledEnd,
            delivery.Notes,
            delivery.Route is null
                ? null
                : new RouteInfoResponse(
                    delivery.Route.DistanceMeters,
                    delivery.Route.DurationSeconds,
                    delivery.Route.Geometry,
                    delivery.Route.UpdatedAt),
            delivery.Incidents
                .OrderByDescending(i => i.CreatedAt)
                .Select(i => new IncidentResponse(i.Id, i.Type, i.Description, i.CreatedAt))
                .ToArray(),
            delivery.CreatedAt,
            delivery.UpdatedAt
        );
    }
}
