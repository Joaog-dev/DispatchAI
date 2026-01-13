namespace DispatchAI.Api.Dto;

public sealed record AuthResponse(
    string Token,
    string UserId,
    string Name,
    string Email,
    string[] Roles,
    string ExpiresAt
);

public sealed record AuthMeResponse(
    string UserId,
    string Name,
    string Email,
    string[] Roles
);
