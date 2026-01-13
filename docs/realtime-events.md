# Fluxo de tempo real

## Origem

- Simulador de motorista envia `DriverLocationUpdateRequest` a cada X segundos.
- API publica evento via SignalR.

## Eventos

1) `tracking.location.updated`
- payload: `TrackingEvent`
- data: driverId, lat, lon, timestamp, deliveryId?

2) `delivery.status.changed`
- payload: `DeliveryStatusChangedEvent`
- data: deliveryId, status, at

3) `delivery.eta.updated`
- payload: `DeliveryEtaUpdatedEvent`
- data: deliveryId, etaSeconds, at

## Pipeline

1) client envia localizacao -> hub
2) hub valida e grava `DriverLocation`
3) hub publica `tracking.location.updated`
4) API recalcula rota/eta (quando necessario)
5) API publica `delivery.eta.updated`
