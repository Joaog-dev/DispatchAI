import { z } from "zod";

import { IdSchema, IsoDateTimeSchema } from "./common";

export const AiRoleSchema = z.enum(["system", "user", "assistant", "tool"]);

export const AiMessageSchema = z.object({
  role: AiRoleSchema,
  content: z.string(),
  toolName: z.string().min(1).optional(),
  toolCallId: z.string().min(1).optional(),
  createdAt: IsoDateTimeSchema.optional(),
});

export const AiToolSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  schema: z.record(z.any()),
});

export const AiToolCallSchema = z.object({
  name: z.string().min(1),
  args: z.record(z.any()),
});

export const AiToolPlanSchema = z.object({
  calls: z.array(AiToolCallSchema).min(1),
});

export const AiChatRequestSchema = z.object({
  conversationId: IdSchema.optional(),
  messages: z.array(AiMessageSchema).min(1),
  tools: z.array(AiToolSchema).optional(),
  context: z.record(z.any()).optional(),
  stream: z.boolean(),
});

export const AiChatChunkSchema = z.object({
  delta: z.string(),
  done: z.boolean(),
  conversationId: IdSchema.optional(),
});

export const AiConversationSchema = z.object({
  id: IdSchema,
  createdAt: IsoDateTimeSchema,
});

export type AiRole = z.infer<typeof AiRoleSchema>;
export type AiMessage = z.infer<typeof AiMessageSchema>;
export type AiTool = z.infer<typeof AiToolSchema>;
export type AiToolCall = z.infer<typeof AiToolCallSchema>;
export type AiToolPlan = z.infer<typeof AiToolPlanSchema>;
export type AiChatRequest = z.infer<typeof AiChatRequestSchema>;
export type AiChatChunk = z.infer<typeof AiChatChunkSchema>;
export type AiConversation = z.infer<typeof AiConversationSchema>;
