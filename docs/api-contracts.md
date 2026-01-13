# Contratos de API (resumo)

Base: `/api`

## Deliveries

- GET `/deliveries`
  - query: `status?`, `driverId?`, `from?`, `to?`
  - response: `Delivery[]`
- POST `/deliveries`
  - body: `DeliveryCreateRequest`
  - response: `Delivery`
- GET `/deliveries/{id}`
  - response: `Delivery`
- PATCH `/deliveries/{id}`
  - body: `DeliveryUpdateRequest`
  - response: `Delivery`
- POST `/deliveries/{id}/assign`
  - body: `DeliveryAssignRequest`
  - response: `Delivery`
- POST `/deliveries/{id}/events`
  - body: `DeliveryEventCreateRequest`
  - response: `DeliveryEvent`

## Drivers

- GET `/drivers`
  - response: `Driver[]`
- POST `/drivers`
  - body: `DriverCreateRequest`
  - response: `Driver`
- POST `/drivers/location`
  - body: `DriverLocationUpdateRequest`
  - response: `DriverLocation`

## Tracking / Realtime

- SignalR hub: `/hub/tracking`
  - client receives: `TrackingEvent`
  - client sends: `DriverLocationUpdateRequest`

## Routes

- POST `/routes`
  - body: `RouteRequest`
  - response: `Route`
- GET `/deliveries/{id}/eta`
  - response: `EtaResponse`

## Incidents

- POST `/incidents`
  - body: `IncidentCreateRequest`
  - response: `Incident`

## AI

- POST `/ai/chat`
  - body: `AiChatRequest`
  - response: stream of `AiChatChunk` (SSE or NDJSON)

Obs: os tipos detalhados estao em `packages/contracts/src`.

## Auth

- POST `/auth/login`
  - body: `AuthLoginRequest`
  - response: `AuthResponse`
- POST `/auth/register`
  - auth: role `dispatcher`
  - body: `AuthRegisterRequest`
  - response: 201 (user summary)
- GET `/auth/me`
  - auth: bearer token
  - response: `AuthMeResponse`
