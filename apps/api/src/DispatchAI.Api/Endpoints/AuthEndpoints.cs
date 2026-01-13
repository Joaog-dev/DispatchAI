using DispatchAI.Api.Domain;
using DispatchAI.Api.Dto;
using DispatchAI.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace DispatchAI.Api.Endpoints;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/auth");

        group.MapPost("/login", async (
            AuthLoginRequest request,
            UserManager<AppUser> userManager,
            JwtTokenService tokenService) =>
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user is null)
            {
                return Results.Unauthorized();
            }

            var ok = await userManager.CheckPasswordAsync(user, request.Password);
            if (!ok)
            {
                return Results.Unauthorized();
            }

            var roles = await userManager.GetRolesAsync(user);
            var token = tokenService.GenerateToken(user, roles, out var expiresAt);

            var response = new AuthResponse(
                token,
                user.Id,
                user.DisplayName,
                user.Email ?? string.Empty,
                roles.ToArray(),
                expiresAt.UtcDateTime.ToString("O")
            );

            return Results.Ok(response);
        });

        group.MapPost("/register", async (
            AuthRegisterRequest request,
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager) =>
        {
            if (!RoleNames.IsValid(request.Role))
            {
                return Results.BadRequest(new { error = "Invalid role." });
            }

            var roleExists = await roleManager.RoleExistsAsync(request.Role);
            if (!roleExists)
            {
                return Results.BadRequest(new { error = "Role does not exist." });
            }

            var existing = await userManager.FindByEmailAsync(request.Email);
            if (existing is not null)
            {
                return Results.BadRequest(new { error = "Email already registered." });
            }

            var user = new AppUser
            {
                UserName = request.Email,
                Email = request.Email,
                DisplayName = request.Name
            };

            var createResult = await userManager.CreateAsync(user, request.Password);
            if (!createResult.Succeeded)
            {
                return Results.BadRequest(new { error = "Could not create user.", details = createResult.Errors });
            }

            var addRoleResult = await userManager.AddToRoleAsync(user, request.Role);
            if (!addRoleResult.Succeeded)
            {
                return Results.BadRequest(new { error = "Could not assign role.", details = addRoleResult.Errors });
            }

            return Results.Created($"/users/{user.Id}", new
            {
                user.Id,
                user.DisplayName,
                user.Email,
                Role = request.Role
            });
        });

        group.MapGet("/me", [Authorize] async (
            ClaimsPrincipal principal,
            UserManager<AppUser> userManager) =>
        {
            var user = await userManager.GetUserAsync(principal);
            if (user is null)
            {
                return Results.Unauthorized();
            }

            var roles = await userManager.GetRolesAsync(user);

            var response = new AuthMeResponse(
                user.Id,
                user.DisplayName,
                user.Email ?? string.Empty,
                roles.ToArray()
            );

            return Results.Ok(response);
        });

        return app;
    }
}
