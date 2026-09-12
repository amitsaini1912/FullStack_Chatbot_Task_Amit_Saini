import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/courses", label: "Courses" },
  { to: "/chatbot", label: "AI Assistant" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.brandIcon} aria-hidden="true">
            ⛛
          </span>
          Drone<span className={styles.brandAccent}>TV</span>
        </NavLink>

        <nav className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className={styles.cta} onClick={() => setMenuOpen(false)}>
            Get in Touch
          </NavLink>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
