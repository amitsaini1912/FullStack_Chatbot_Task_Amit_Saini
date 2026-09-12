import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import styles from "./EnquiryDetailModal.module.css";
import { Enquiry, EnquiryStatus } from "../types/enquiry";
import { updateEnquiryStatus } from "../api/enquiries";
import { ApiError } from "../api/client";

interface EnquiryDetailModalProps {
  enquiry: Enquiry;
  onClose: () => void;
  onStatusUpdated: (updated: Enquiry) => void;
}

const STATUS_OPTIONS: EnquiryStatus[] = ["New", "Contacted", "In Progress", "Closed"];

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EnquiryDetailModal({
  enquiry,
  onClose,
  onStatusUpdated,
}: EnquiryDetailModalProps) {
  const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  async function handleUpdateStatus() {
    if (status === enquiry.status) return;

    setSaving(true);
    setFeedback(null);

    try {
      const updated = await updateEnquiryStatus(enquiry._id, status);
      onStatusUpdated(updated);
      setFeedback({ type: "success", text: "Status updated successfully." });
    } catch (error) {
      setFeedback({
        type: "error",
        text: error instanceof ApiError ? error.message : "Failed to update status.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal title="Enquiry Details" onClose={onClose}>
      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.label}>Name</span>
          <span className={styles.value}>{enquiry.name}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{enquiry.email}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Phone</span>
          <span className={styles.value}>{enquiry.phone}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>User Type</span>
          <span className={styles.value}>{enquiry.userType}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Interest</span>
          <span className={styles.value}>{enquiry.interest}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Message</span>
          <div className={styles.message}>{enquiry.message}</div>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Received</span>
          <span className={styles.value}>{formatDateTime(enquiry.createdAt)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Status</span>
          <div className={styles.statusRow}>
            <select
              className={styles.select}
              value={status}
              onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Button
              variant="secondary"
              disabled={status === enquiry.status || saving}
              onClick={handleUpdateStatus}
            >
              {saving ? "Saving..." : "Update Status"}
            </Button>
          </div>
          {feedback && (
            <span
              className={`${styles.feedback} ${
                feedback.type === "success" ? styles.feedbackSuccess : styles.feedbackError
              }`}
            >
              {feedback.text}
            </span>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
