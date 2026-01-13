# DispatchAI (monorepo)

Painel local de entregas com tracking em tempo real e assistente IA. Este repo e um monorepo com front (Next.js) e back (.NET 8), mais um pacote de contratos compartilhados.

## Estrutura

- apps/web: frontend Next.js + Tailwind + Zustand
- apps/api: backend .NET 8 Minimal APIs + SignalR
- packages/contracts: contratos e schemas (Zod) usados no front
- docs: desenho de arquitetura, contratos, tempo real e gateway IA

Detalhes estao em `docs/architecture.md` e `docs/api-contracts.md`.
