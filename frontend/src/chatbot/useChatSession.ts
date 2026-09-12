import { useCallback, useEffect, useState } from "react";
import { ChatMessage } from "./types";
import { getBotReply, MAIN_MENU_CHIPS } from "./botEngine";

const STORAGE_KEY = "dronetv_chat_session";

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function welcomeMessage(): ChatMessage {
  return {
    id: createId(),
    sender: "bot",
    text: "Welcome to DroneTV! I'm your virtual assistant. Ask me about our services, courses, or how to get in touch - or pick an option below.",
    timestamp: new Date().toISOString(),
    quickReplies: MAIN_MENU_CHIPS,
  };
}

function loadMessages(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore corrupted session storage
  }
  return [welcomeMessage()];
}

export function useChatSession() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // storage unavailable (private browsing, quota) - fail silently
    }
  }, [messages]);

  const appendMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const sendUserText = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: createId(),
      sender: "user",
      text: trimmed,
      timestamp: new Date().toISOString(),
    };

    const reply = getBotReply(trimmed);
    const botMessage: ChatMessage = {
      id: createId(),
      sender: "bot",
      text: reply.text,
      timestamp: new Date().toISOString(),
      quickReplies: reply.quickReplies,
      formType: reply.formType ?? null,
      formDefaults: reply.formDefaults,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
  }, []);

  const markFormSubmitted = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, formSubmitted: true } : m))
    );
  }, []);

  const resetConversation = useCallback(() => {
    const fresh = [welcomeMessage()];
    setMessages(fresh);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // ignore
    }
  }, []);

  return { messages, sendUserText, appendMessage, markFormSubmitted, resetConversation };
}
