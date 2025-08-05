import { Link } from "react-router";
import { ArrowRight, Folder } from "lucide-react";
import styles from "./home.module.css";
import { Button } from "../components/Button";

const Home = () => {
  return (
    <div className={styles.page}>
      <div className={styles.heroContent}>
        <div className={styles.iconWrapper}>
          <Folder className={styles.icon} />
        </div>

        <h1 className={styles.title}>Plannr</h1>

        <p className={styles.subtitle}>
          The collaborative task board that brings your team together. Organize
          projects, track progress, and achieve goals faster.
        </p>

        <div className={styles.buttons}>
          <Link to="/register">
            <Button variant="hero" size="xl" className={styles.button}>
              Get Started Free
              <ArrowRight className={styles.arrowIcon} />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="xl" className={styles.button}>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
