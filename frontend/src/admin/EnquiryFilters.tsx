import styles from "./EnquiryFilters.module.css";

interface EnquiryFiltersProps {
  search: string;
  userType: string;
  status: string;
  onSearchChange: (value: string) => void;
  onUserTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function EnquiryFilters({
  search,
  userType,
  status,
  onSearchChange,
  onUserTypeChange,
  onStatusChange,
}: EnquiryFiltersProps) {
  return (
    <div className={styles.bar}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search by name, email, or phone..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className={styles.select}
        value={userType}
        onChange={(e) => onUserTypeChange(e.target.value)}
      >
        <option value="">All User Types</option>
        <option value="Student">Student</option>
        <option value="Customer">Customer</option>
        <option value="Other">Other</option>
      </select>

      <select
        className={styles.select}
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}
