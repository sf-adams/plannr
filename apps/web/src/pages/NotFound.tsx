import { Link, useLocation } from "react-router";
import { useEffect } from "react";
import styles from "./not-found.module.css";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Invalid route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! Page not found</p>
        <Link to="/" className={styles.link}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
