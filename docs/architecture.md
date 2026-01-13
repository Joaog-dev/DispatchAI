# Arquitetura e pastas

## Monorepo

```
/apps
  /web
    /src
      /app
      /features
      /shared
  /api
    /src
      /DispatchAI.Api
/packages
  /contracts
    /src
/docs
```

## Front (apps/web)

Estrutura por features:

```
/apps/web/src
  /app
    layout.tsx
    page.tsx
  /features
    /deliveries
      /api
      /model
      /ui
    /drivers
      /api
      /model
      /ui
    /tracking
      /api
      /model
      /ui
    /map
      /lib
      /ui
    /ai
      /api
      /model
      /ui
  /shared
    /api
    /config
    /lib
    /store
    /types
    /ui
```

Notas:
- /features concentram UI, logica de negocio e chamadas de API.
- /shared guarda primitivas comuns e helpers.
- Zustand fica em /features/*/model ou /shared/store.

## Back (apps/api)

```
/apps/api/src/DispatchAI.Api
  /Endpoints
  /Domain
  /Dto
  /Infra
  /Realtime
  /Services
```

Notas:
- /Endpoints mapeia rotas minimal APIs.
- /Domain contem entidades e enums.
- /Dto espelha contratos do pacote /packages/contracts.
- /Realtime concentra SignalR e eventos.
- /Services integra OSRM, Nominatim, Open-Meteo e Ollama.
