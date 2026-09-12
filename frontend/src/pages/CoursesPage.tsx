import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import styles from "./ServicesPage.module.css";

const COURSES = [
  {
    icon: "🎮",
    title: "Drone Pilot Training & DGCA Prep",
    duration: "4 weeks",
    desc: "Learn flight fundamentals, airspace rules, and prepare for the DGCA remote pilot certificate exam.",
  },
  {
    icon: "🔧",
    title: "Drone Assembly Workshop",
    duration: "2-day intensive",
    desc: "Hands-on workshop covering frame building, motor/ESC wiring, and flight controller setup.",
  },
  {
    icon: "🧰",
    title: "Advanced Drone Maintenance",
    duration: "3 weeks",
    desc: "Deep dive into diagnostics, firmware calibration, and repair for commercial drone fleets.",
  },
  {
    icon: "🎬",
    title: "Aerial Cinematography Program",
    duration: "3 weeks",
    desc: "Master cinematic camera movement, composition, and post-production for aerial footage.",
  },
  {
    icon: "🌱",
    title: "Agri-Drone Operator Course",
    duration: "2 weeks",
    desc: "Training focused on spraying operations, payload handling, and field safety protocols.",
  },
  {
    icon: "📊",
    title: "GIS & Mapping for Drone Pilots",
    duration: "2 weeks",
    desc: "Process aerial imagery into maps and models using industry-standard GIS software.",
  },
];

export default function CoursesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Learn With Us"
        title="Courses & Training Programs"
        subtitle="Structured, hands-on programs for beginners and professionals looking to build real drone skills."
      />

      <section className={styles.section}>
        <div className={`container ${styles.grid}`}>
          {COURSES.map((course) => (
            <article key={course.title} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">
                {course.icon}
              </span>
              <h3 className={styles.cardTitle}>{course.title}</h3>
              <p className={styles.cardDesc}>
                <strong>{course.duration}</strong> &middot; {course.desc}
              </p>
              <Link
                to="/contact"
                state={{ interest: course.title, userType: "Student" }}
                className={styles.link}
              >
                Enquire about this &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
