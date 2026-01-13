# Api app

.NET 8 Minimal APIs + Identity + JWT.
SQLite local for dev.

## Auth

- Seed admin via `appsettings.json` (default: admin@local / ChangeMe123!)
- Roles: dispatcher, driver
- Update `Jwt:Key` before uso real

## Run

- dotnet restore
- dotnet run --project apps/api/src/DispatchAI.Api
