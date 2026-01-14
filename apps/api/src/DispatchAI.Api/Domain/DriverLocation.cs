namespace DispatchAI.Api.Domain;

public sealed class DriverLocation
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string DriverId { get; set; } = string.Empty;

    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTimeOffset RecordedAt { get; set; } = DateTimeOffset.UtcNow;
}
