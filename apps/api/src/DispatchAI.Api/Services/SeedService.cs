using DispatchAI.Api.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace DispatchAI.Api.Services;

public sealed class SeedOptions
{
    public SeedAdminOptions Admin { get; init; } = new();
}

public sealed class SeedAdminOptions
{
    public string Name { get; init; } = "Admin";
    public string Email { get; init; } = "admin@local";
    public string Password { get; init; } = "ChangeMe123!";
}

public sealed class SeedService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly SeedOptions _options;

    public SeedService(
        UserManager<AppUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IOptions<SeedOptions> options)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _options = options.Value;
    }

    public async Task SeedAsync()
    {
        foreach (var role in RoleNames.All)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        if (string.IsNullOrWhiteSpace(_options.Admin.Email))
        {
            return;
        }

        var existing = await _userManager.FindByEmailAsync(_options.Admin.Email);
        if (existing is null)
        {
            var user = new AppUser
            {
                UserName = _options.Admin.Email,
                Email = _options.Admin.Email,
                DisplayName = _options.Admin.Name
            };

            var result = await _userManager.CreateAsync(user, _options.Admin.Password);
            if (!result.Succeeded)
            {
                return;
            }

            await _userManager.AddToRoleAsync(user, RoleNames.Dispatcher);
            return;
        }

        var roles = await _userManager.GetRolesAsync(existing);
        if (!roles.Contains(RoleNames.Dispatcher))
        {
            await _userManager.AddToRoleAsync(existing, RoleNames.Dispatcher);
        }
    }
}
