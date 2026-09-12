import styles from "./StatusBadge.module.css";
import { EnquiryStatus } from "../types/enquiry";

const CLASS_MAP: Record<EnquiryStatus, string> = {
  New: styles.New,
  Contacted: styles.Contacted,
  "In Progress": styles.InProgress,
  Closed: styles.Closed,
};

export default function StatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <span className={`${styles.badge} ${CLASS_MAP[status]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {status}
    </span>
  );
}
