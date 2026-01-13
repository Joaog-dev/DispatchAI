namespace DispatchAI.Api.Dto;

public sealed record AuthRegisterRequest(string Name, string Email, string Password, string Role);
