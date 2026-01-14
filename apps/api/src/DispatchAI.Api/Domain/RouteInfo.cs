namespace DispatchAI.Api.Domain;

public sealed class RouteInfo
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid DeliveryId { get; set; }
    public Delivery? Delivery { get; set; }

    public double DistanceMeters { get; set; }
    public double DurationSeconds { get; set; }

    // GeoJSON or encoded polyline (string) for simplicity.
    public string? Geometry { get; set; }

    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
}
