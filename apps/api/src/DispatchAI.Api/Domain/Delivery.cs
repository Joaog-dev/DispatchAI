using System.ComponentModel.DataAnnotations;

namespace DispatchAI.Api.Domain;

public static class DeliveryStatus
{
    public const string Pending = "pending";
    public const string InRoute = "in_route";
    public const string Collected = "collected";
    public const string Delivered = "delivered";
    public const string Failed = "failed";

    public static readonly string[] All =
    [
        Pending,
        InRoute,
        Collected,
        Delivered,
        Failed
    ];

    public static bool IsValid(string status) => All.Contains(status);
}

public sealed class Delivery
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(160)]
    public string Code { get; set; } = string.Empty;

    [MaxLength(200)]
    public string OriginAddress { get; set; } = string.Empty;

    public double OriginLat { get; set; }
    public double OriginLng { get; set; }

    [MaxLength(200)]
    public string DestinationAddress { get; set; } = string.Empty;

    public double DestinationLat { get; set; }
    public double DestinationLng { get; set; }

    [MaxLength(24)]
    public string Status { get; set; } = DeliveryStatus.Pending;

    public DateTimeOffset? ScheduledStart { get; set; }
    public DateTimeOffset? ScheduledEnd { get; set; }

    [MaxLength(200)]
    public string? Notes { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;

    public string? DriverId { get; set; }
    public AppUser? Driver { get; set; }

    public RouteInfo? Route { get; set; }
    public List<Incident> Incidents { get; set; } = new();
}
