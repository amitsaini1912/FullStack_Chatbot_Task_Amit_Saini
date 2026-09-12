import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import Button from "../components/Button";

const FEATURES = [
  {
    icon: "🛰️",
    title: "Precision Aerial Data",
    desc: "Survey-grade mapping and inspection data captured with calibrated drone hardware.",
  },
  {
    icon: "🎓",
    title: "Structured Training",
    desc: "Beginner to advanced programs designed with certification pathways in mind.",
  },
  {
    icon: "🤖",
    title: "AI-Assisted Support",
    desc: "Our assistant answers common questions instantly and routes real needs to our team.",
  },
];

const STATS = [
  { number: "500+", label: "Enquiries Handled" },
  { number: "40+", label: "Corporate Clients" },
  { number: "300+", label: "Pilots Trained" },
  { number: "12", label: "Cities Covered" },
];

export default function HomePage() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <span className={styles.eyebrow}>Drone Services &amp; Training</span>
            <h1 className={styles.title}>
              Fly smarter with <span className={styles.titleAccent}>DroneTV</span>
            </h1>
            <p className={styles.subtitle}>
              DroneTV helps businesses capture aerial insight and helps aspiring pilots build
              real skills - backed by an AI assistant that is available around the clock.
            </p>
            <div className={styles.ctaRow}>
              <Link to="/services">
                <Button variant="primary">Explore Services</Button>
              </Link>
              <Link to="/chatbot">
                <Button variant="secondary">Chat with our Assistant</Button>
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual} aria-hidden="true">
            🛸
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={`container ${styles.statsGrid}`}>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.about}>
        <div className={`container ${styles.aboutGrid}`}>
          <div>
            <div className={styles.sectionEyebrow}>About DroneTV</div>
            <h2 className={styles.sectionTitle}>Built for pilots, businesses, and learners</h2>
            <p className={styles.aboutText}>
              DroneTV started as a small team of certified drone operators and has grown into a
              full-service studio offering aerial services alongside hands-on training programs.
              We combine field experience with a genuine interest in helping newcomers enter the
              drone industry safely and confidently.
            </p>
            <p className={styles.aboutText}>
              Whether you need aerial data for a project or want to build a career as a certified
              drone pilot, our team - and our AI assistant - are here to guide you.
            </p>
          </div>
          <ul className={styles.featureList}>
            {FEATURES.map((feature) => (
              <li key={feature.title} className={styles.featureItem}>
                <span className={styles.featureIcon} aria-hidden="true">
                  {feature.icon}
                </span>
                <div>
                  <div className={styles.featureTitle}>{feature.title}</div>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className="container">
          <h2 className={styles.ctaBannerTitle}>Ready to take off?</h2>
          <p className={styles.ctaBannerText}>
            Tell us what you need - a service quote or a seat in our next training batch - and
            we'll take it from there.
          </p>
          <div className={styles.ctaBannerRow}>
            <Link to="/contact">
              <Button variant="primary">Send an Enquiry</Button>
            </Link>
            <Link to="/courses">
              <Button variant="secondary">View Courses</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
