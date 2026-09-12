import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: "100px 0", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem" }}>404</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "24px" }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
}
