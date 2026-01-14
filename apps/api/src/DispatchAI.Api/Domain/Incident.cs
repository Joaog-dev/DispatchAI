using System.ComponentModel.DataAnnotations;

namespace DispatchAI.Api.Domain;

public sealed class Incident
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid DeliveryId { get; set; }
    public Delivery? Delivery { get; set; }

    [MaxLength(60)]
    public string Type { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
