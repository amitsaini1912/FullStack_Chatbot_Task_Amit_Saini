import PageHero from "../components/PageHero";
import ChatWindow from "../chatbot/ChatWindow";
import styles from "./ChatbotPage.module.css";

export default function ChatbotPage() {
  return (
    <div>
      <PageHero
        eyebrow="AI Support"
        title="Chat with the DroneTV Assistant"
        subtitle="Ask about our services, courses, registration, or leave your details for our team."
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.wrapper}>
            <ChatWindow />
          </div>
        </div>
      </section>
    </div>
  );
}
