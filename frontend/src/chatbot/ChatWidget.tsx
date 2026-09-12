import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ChatWidget.module.css";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith("/admin") || location.pathname === "/chatbot") {
    return null;
  }

  return (
    <>
      {open && (
        <div className={styles.panel}>
          <ChatWindow />
        </div>
      )}
      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        {open ? "✕" : "💬"}
      </button>
    </>
  );
}
