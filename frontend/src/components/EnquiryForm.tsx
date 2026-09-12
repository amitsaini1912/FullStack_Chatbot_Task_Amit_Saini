import { FormEvent, useState } from "react";
import styles from "./EnquiryForm.module.css";
import Button from "./Button";
import { EnquiryFormData, UserType } from "../types/enquiry";
import { validateEnquiryForm, FormErrors } from "../utils/validation";
import { createEnquiry } from "../api/enquiries";
import { ApiError } from "../api/client";

const EMPTY_FORM: EnquiryFormData = {
  name: "",
  email: "",
  phone: "",
  userType: "",
  interest: "",
  message: "",
};

interface EnquiryFormProps {
  compact?: boolean;
  initialValues?: Partial<EnquiryFormData>;
  onSuccess?: () => void;
}

export default function EnquiryForm({ compact = false, initialValues, onSuccess }: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>({ ...EMPTY_FORM, ...initialValues });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(field: keyof EnquiryFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validationErrors = validateEnquiryForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setSubmitting(true);
    setStatus("idle");

    try {
      await createEnquiry(formData);
      setStatus("success");
      setStatusMessage("Thank you! Your enquiry has been submitted. Our team will reach out soon.");
      setFormData(EMPTY_FORM);
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof ApiError ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={`${styles.form} ${compact ? styles.compact : ""}`} onSubmit={handleSubmit} noValidate>
      {status === "success" && (
        <div className={`${styles.banner} ${styles.bannerSuccess}`} role="status">
          {statusMessage}
        </div>
      )}
      {status === "error" && (
        <div className={`${styles.banner} ${styles.bannerError}`} role="alert">
          {statusMessage}
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Full name <span className={styles.required}>*</span>
          </label>
          <input
            id="name"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            maxLength={100}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email <span className={styles.required}>*</span>
          </label>
          <input
            id="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="phone">
            Phone (10 digits) <span className={styles.required}>*</span>
          </label>
          <input
            id="phone"
            className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
            maxLength={10}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="userType">
            I am a <span className={styles.required}>*</span>
          </label>
          <select
            id="userType"
            className={`${styles.select} ${errors.userType ? styles.inputError : ""}`}
            value={formData.userType}
            onChange={(e) => handleChange("userType", e.target.value as UserType)}
          >
            <option value="">Select one</option>
            <option value="Student">Student</option>
            <option value="Customer">Customer</option>
            <option value="Other">Other</option>
          </select>
          {errors.userType && <span className={styles.errorText}>{errors.userType}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="interest">
          What are you interested in? <span className={styles.required}>*</span>
        </label>
        <input
          id="interest"
          className={`${styles.input} ${errors.interest ? styles.inputError : ""}`}
          type="text"
          placeholder="e.g. Drone Pilot Training, Aerial Survey Service"
          value={formData.interest}
          onChange={(e) => handleChange("interest", e.target.value)}
          maxLength={150}
        />
        {errors.interest && <span className={styles.errorText}>{errors.interest}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Message <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          maxLength={1000}
        />
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Enquiry"}
      </Button>
    </form>
  );
}
