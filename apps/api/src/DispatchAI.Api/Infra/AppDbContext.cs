using DispatchAI.Api.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DispatchAI.Api.Infra;

public sealed class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Delivery> Deliveries => Set<Delivery>();
    public DbSet<RouteInfo> Routes => Set<RouteInfo>();
    public DbSet<Incident> Incidents => Set<Incident>();
    public DbSet<DriverLocation> DriverLocations => Set<DriverLocation>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Delivery>(entity =>
        {
            entity.HasIndex(x => x.Code).IsUnique(false);
            entity.Property(x => x.Status).HasMaxLength(24);
            entity.Property(x => x.OriginAddress).HasMaxLength(200);
            entity.Property(x => x.DestinationAddress).HasMaxLength(200);
            entity.Property(x => x.Notes).HasMaxLength(200);

            entity
                .HasOne(d => d.Route)
                .WithOne(r => r.Delivery)
                .HasForeignKey<RouteInfo>(r => r.DeliveryId);

            entity
                .HasMany(d => d.Incidents)
                .WithOne(i => i.Delivery!)
                .HasForeignKey(i => i.DeliveryId);
        });

        builder.Entity<RouteInfo>(entity =>
        {
            entity.Property(r => r.Geometry).HasMaxLength(8000);
        });

        builder.Entity<Incident>(entity =>
        {
            entity.Property(i => i.Type).HasMaxLength(60);
            entity.Property(i => i.Description).HasMaxLength(500);
        });
    }
}
