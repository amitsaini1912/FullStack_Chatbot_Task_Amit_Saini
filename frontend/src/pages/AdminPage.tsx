import { useCallback, useEffect, useState } from "react";
import styles from "./AdminPage.module.css";
import StatCards from "../admin/StatCards";
import EnquiryFilters from "../admin/EnquiryFilters";
import EnquiryTable from "../admin/EnquiryTable";
import EnquiryDetailModal from "../admin/EnquiryDetailModal";
import { Enquiry, EnquiryStatus } from "../types/enquiry";
import { deleteEnquiry, fetchEnquiries } from "../api/enquiries";
import { ApiError } from "../api/client";

const EMPTY_STATUS_COUNTS: Record<EnquiryStatus, number> = {
  New: 0,
  Contacted: 0,
  "In Progress": 0,
  Closed: 0,
};

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [statusCounts, setStatusCounts] = useState(EMPTY_STATUS_COUNTS);
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [userType, setUserType] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await fetchEnquiries({ search, userType, status, page, limit: 10 });
      setEnquiries(result.enquiries);
      setStatusCounts(result.statusCounts);
      setTotalEnquiries(result.totalEnquiries);
      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load enquiries.");
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  }, [search, userType, status, page]);

  useEffect(() => {
    const timer = setTimeout(loadEnquiries, 300);
    return () => clearTimeout(timer);
  }, [loadEnquiries]);

  useEffect(() => {
    setPage(1);
  }, [search, userType, status]);

  async function handleDelete(enquiry: Enquiry) {
    if (!window.confirm(`Delete the enquiry from ${enquiry.name}? This cannot be undone.`)) {
      return;
    }

    try {
      await deleteEnquiry(enquiry._id);
      await loadEnquiries();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed to delete enquiry.");
    }
  }

  function handleStatusUpdated(updated: Enquiry) {
    setEnquiries((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
    setSelectedEnquiry(updated);
    loadEnquiries();
  }

  return (
    <div className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <p className={styles.subtitle}>Manage incoming enquiries and track their status.</p>
          </div>
        </div>

        <StatCards total={totalEnquiries} statusCounts={statusCounts} />

        <EnquiryFilters
          search={search}
          userType={userType}
          status={status}
          onSearchChange={setSearch}
          onUserTypeChange={setUserType}
          onStatusChange={setStatus}
        />

        {loading && <div className={styles.stateBox}>Loading enquiries...</div>}

        {!loading && error && <div className={`${styles.stateBox} ${styles.errorBox}`}>{error}</div>}

        {!loading && !error && (
          <>
            <EnquiryTable
              enquiries={enquiries}
              onView={setSelectedEnquiry}
              onDelete={handleDelete}
            />

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  type="button"
                  className={styles.pageButton}
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  className={styles.pageButton}
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onStatusUpdated={handleStatusUpdated}
        />
      )}
    </div>
  );
}
