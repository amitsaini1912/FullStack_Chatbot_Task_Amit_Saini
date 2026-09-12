import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import styles from "./ServicesPage.module.css";

const SERVICES = [
  {
    icon: "🗺️",
    title: "Aerial Survey & Mapping",
    desc: "High-accuracy orthomosaic maps and elevation models for land, construction, and mining sites.",
  },
  {
    icon: "🌾",
    title: "Agricultural Drone Spraying",
    desc: "Precision spraying for crop protection that reduces chemical usage and covers large fields quickly.",
  },
  {
    icon: "🎥",
    title: "Drone Videography & Photography",
    desc: "Cinematic aerial footage and photography for real estate, events, and marketing campaigns.",
  },
  {
    icon: "🏗️",
    title: "Industrial & Infrastructure Inspection",
    desc: "Safe, close-range inspection of towers, pipelines, solar farms, and rooftops without downtime.",
  },
  {
    icon: "📦",
    title: "Custom Drone Solutions",
    desc: "Tailored hardware and workflow consulting for businesses building drone-based operations.",
  },
  {
    icon: "🛠️",
    title: "Drone Maintenance & Repair",
    desc: "Diagnostics, part replacement, and firmware servicing to keep your fleet flight-ready.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="What We Do"
        title="Drone Services for Every Need"
        subtitle="From large-scale surveys to cinematic shoots, our certified pilots and equipment are ready to help."
      />

      <section className={styles.section}>
        <div className={`container ${styles.grid}`}>
          {SERVICES.map((service) => (
            <article key={service.title} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">
                {service.icon}
              </span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              <Link
                to="/contact"
                state={{ interest: service.title, userType: "Customer" }}
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
