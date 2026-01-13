# Zustand stores (front)

Objetivo: separar estado por feature e manter slices pequenas.

## Slices sugeridas

1) deliveriesSlice
- list, byId, filters, loading, error
- actions: fetchList, fetchById, create, update, assign

2) driversSlice
- list, byId, activeDriverId
- actions: fetchDrivers, setActiveDriver

3) trackingSlice
- locationsByDriver, lastEventByDelivery
- actions: connectTracking, disconnectTracking, pushLocation

4) mapSlice
- mapState, selectedDeliveryId, routeGeojson, etaSeconds
- actions: setMapState, setSelectedDelivery, setRoute

5) aiSlice
- conversationId, messages, streaming, error
- actions: sendMessage, appendChunk, setConversation

6) uiSlice
- panels (list/map/ai), toasts

## Store layout

- /features/*/model usa useFeatureStore (local store)
- /shared/store/rootStore compoe slices quando necessario
