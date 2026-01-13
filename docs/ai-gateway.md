# Gateway IA (/api/ai/chat)

## Objetivo

Orquestrar Ollama, streaming e tool-calling com validacao via Zod.

## Request (AiChatRequest)

- conversationId?
- messages[] (role, content)
- tools[] (name, description, schema)
- context? (deliveryId, driverId)
- stream: true

## Response (stream)

Formato recomendado: SSE (`text/event-stream`)

```
event: chunk
data: {"delta":"texto parcial","done":false}

event: chunk
data: {"delta":"","done":true}
```

## Fluxo

1) Backend monta prompt + contexto (ex: deliveryId)
2) Chama Ollama `/api/generate` com `stream: true`
3) Repassa tokens para o client via SSE
4) Se o modelo retornar JSON de tool-calling:
   - valida com Zod
   - executa tools
   - adiciona resultados a conversa
   - faz nova chamada ao modelo para resposta final

## Dicas

- Manter log/auditoria de chamadas e tool results
- Limitar tamanho do contexto
