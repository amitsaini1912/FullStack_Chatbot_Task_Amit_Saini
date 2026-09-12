import styles from "./StatCards.module.css";
import { EnquiryStatus } from "../types/enquiry";

interface StatCardsProps {
  total: number;
  statusCounts: Record<EnquiryStatus, number>;
}

export default function StatCards({ total, statusCounts }: StatCardsProps) {
  const cards = [
    { label: "Total Enquiries", value: total, accent: styles.accentTotal },
    { label: "New", value: statusCounts.New ?? 0, accent: styles.accentNew },
    { label: "Contacted", value: statusCounts.Contacted ?? 0, accent: styles.accentContacted },
    {
      label: "In Progress",
      value: statusCounts["In Progress"] ?? 0,
      accent: styles.accentInProgress,
    },
    { label: "Closed", value: statusCounts.Closed ?? 0, accent: styles.accentClosed },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div key={card.label} className={styles.card}>
          <div className={`${styles.value} ${card.accent}`}>{card.value}</div>
          <div className={styles.label}>{card.label}</div>
        </div>
      ))}
    </div>
  );
}
