import { useEffect, useRef, useState } from "react";
import styles from "./ChatWindow.module.css";
import EnquiryForm from "../components/EnquiryForm";
import { useChatSession } from "./useChatSession";

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWindow() {
  const { messages, sendUserText, markFormSubmitted, resetConversation } = useChatSession();
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!inputValue.trim()) return;
    sendUserText(inputValue);
    setInputValue("");
  }

  function handleReset() {
    if (window.confirm("Clear this conversation?")) {
      resetConversation();
    }
  }

  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.statusDot} aria-hidden="true" />
          DroneTV Assistant
        </div>
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          Clear chat
        </button>
      </div>

      <div className={styles.messages} ref={scrollRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageRow} ${
              message.sender === "bot" ? styles.rowBot : styles.rowUser
            }`}
          >
            <div
              className={`${styles.bubble} ${
                message.sender === "bot" ? styles.bubbleBot : styles.bubbleUser
              }`}
            >
              {message.text}
            </div>
            <span className={styles.timestamp}>{formatTime(message.timestamp)}</span>

            {message.quickReplies && message.quickReplies.length > 0 && (
              <div className={styles.chips}>
                {message.quickReplies.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    className={styles.chip}
                    onClick={() => sendUserText(chip.label)}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            {message.formType && !message.formSubmitted && (
              <div className={styles.formCard}>
                <EnquiryForm
                  compact
                  initialValues={{
                    userType: message.formDefaults?.userType,
                    interest: message.formDefaults?.interest,
                  }}
                  onSuccess={() => markFormSubmitted(message.id)}
                />
              </div>
            )}

            {message.formType && message.formSubmitted && (
              <div className={styles.formDone}>Enquiry submitted. Thank you!</div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.inputBar}>
        <input
          className={styles.textInput}
          type="text"
          placeholder="Type your question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          type="button"
          className={styles.sendButton}
          onClick={handleSend}
          disabled={!inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
