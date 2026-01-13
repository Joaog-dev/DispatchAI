using Microsoft.AspNetCore.Identity;

namespace DispatchAI.Api.Domain;

public sealed class AppUser : IdentityUser
{
    public string DisplayName { get; set; } = string.Empty;
}
