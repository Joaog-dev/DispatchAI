namespace DispatchAI.Api.Domain;

public static class RoleNames
{
    public const string Dispatcher = "dispatcher";
    public const string Driver = "driver";

    public static readonly string[] All = new[] { Dispatcher, Driver };

    public static bool IsValid(string? role)
    {
        if (string.IsNullOrWhiteSpace(role))
        {
            return false;
        }

        return role == Dispatcher || role == Driver;
    }
}
