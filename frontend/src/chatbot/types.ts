import { UserType } from "../types/enquiry";

export interface QuickReply {
  id: string;
  label: string;
}

export type MessageSender = "bot" | "user";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  quickReplies?: QuickReply[];
  formType?: FormTrigger;
  formDefaults?: { userType?: UserType; interest?: string };
  formSubmitted?: boolean;
}

export type FormTrigger = "service" | "course" | "general" | null;

export interface BotReply {
  text: string;
  quickReplies?: QuickReply[];
  formType?: FormTrigger;
  formDefaults?: { userType?: UserType; interest?: string };
}
