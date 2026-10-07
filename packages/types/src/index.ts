export const ROLES = ["OWNER", "AGENT"] as const;
export type Role = (typeof ROLES)[number];

export const CONVERSATION_STATUSES = ["OPEN", "PENDING", "RESOLVED"] as const;
export type ConversationStatus = (typeof CONVERSATION_STATUSES)[number];

export const MESSAGE_AUTHORS = ["VISITOR", "AGENT", "SYSTEM"] as const;
export type MessageAuthor = (typeof MESSAGE_AUTHORS)[number];

export const CHANNELS = ["WIDGET", "EMAIL"] as const;
export type Channel = (typeof CHANNELS)[number];

export const API_SERVICE_NAME = "api" as const;

export type ServiceHealth = "up" | "down";

export interface HealthResponse {
  status: "ok" | "degraded";
  service: typeof API_SERVICE_NAME;
  database: ServiceHealth;
  timestamp: string;
}

export const DEFAULT_WELCOME_MESSAGE = "Hi! How can we help?";

export interface WidgetEmbedConfig {
  publicKey: string;
  welcomeMessage: string;
}
