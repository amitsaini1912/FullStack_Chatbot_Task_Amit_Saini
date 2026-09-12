import styles from "./EnquiryTable.module.css";
import StatusBadge from "./StatusBadge";
import { Enquiry } from "../types/enquiry";

interface EnquiryTableProps {
  enquiries: Enquiry[];
  onView: (enquiry: Enquiry) => void;
  onDelete: (enquiry: Enquiry) => void;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function EnquiryTable({ enquiries, onView, onDelete }: EnquiryTableProps) {
  if (enquiries.length === 0) {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.empty}>No enquiries match your filters.</div>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Type</th>
            <th>Interest</th>
            <th>Status</th>
            <th>Received</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry._id}>
              <td className={styles.name}>{enquiry.name}</td>
              <td>
                <div>{enquiry.email}</div>
                <div className={styles.muted}>{enquiry.phone}</div>
              </td>
              <td>{enquiry.userType}</td>
              <td>{enquiry.interest}</td>
              <td>
                <StatusBadge status={enquiry.status} />
              </td>
              <td className={styles.muted}>{formatDate(enquiry.createdAt)}</td>
              <td>
                <div className={styles.actions}>
                  <button type="button" className={styles.actionButton} onClick={() => onView(enquiry)}>
                    View
                  </button>
                  <button
                    type="button"
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => onDelete(enquiry)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
