import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import styles from "./register.module.css";
import { LogIn } from "lucide-react";
import api from "../lib/axios";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", response.data.access_token);

      navigate("/dashboard");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <LogIn className={styles.icon} />
          </div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className={styles.input}
              placeholder="you@example.com"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className={styles.input}
              placeholder="••••••••"
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className={styles.footer}>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className={styles.link}>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
