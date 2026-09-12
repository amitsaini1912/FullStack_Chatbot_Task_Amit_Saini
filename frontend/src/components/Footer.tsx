import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.brand}>
              Drone<span className={styles.brandAccent}>TV</span>
            </div>
            <p className={styles.tagline}>
              Practical drone services and hands-on training for pilots, businesses, and
              enthusiasts across India.
            </p>
          </div>

          <div>
            <div className={styles.heading}>Explore</div>
            <ul className={styles.list}>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/courses">Courses &amp; Training</Link>
              </li>
              <li>
                <Link to="/chatbot">AI Assistant</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className={styles.heading}>Get in touch</div>
            <ul className={styles.list}>
              <li>
                <Link to="/contact">Enquiry Form</Link>
              </li>
              <li>support@dronetv.example</li>
              <li>+91 90000 00000</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          &copy; {year} DroneTV. Built by Amit Kumar Saini &mdash; internship project.
        </div>
      </div>
    </footer>
  );
}
