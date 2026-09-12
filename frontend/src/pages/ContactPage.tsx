import { useLocation } from "react-router-dom";
import PageHero from "../components/PageHero";
import EnquiryForm from "../components/EnquiryForm";
import styles from "./ContactPage.module.css";
import { EnquiryFormData } from "../types/enquiry";

interface NavState {
  interest?: string;
  userType?: EnquiryFormData["userType"];
}

export default function ContactPage() {
  const location = useLocation();
  const state = (location.state as NavState) || {};

  return (
    <div>
      <PageHero
        eyebrow="Get in Touch"
        title="Send Us an Enquiry"
        subtitle="Fill in the form below and our team will get back to you within 24-48 hours."
      />

      <section className={styles.section}>
        <div className={`container`}>
          <div className={styles.wrapper}>
            <EnquiryForm
              initialValues={{ interest: state.interest, userType: state.userType }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
