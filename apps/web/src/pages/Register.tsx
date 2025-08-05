import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import styles from "./register.module.css";
import { UserPlus } from "lucide-react";
import api from "../lib/axios";

type RegisterFormData = {
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      await api.post("/auth/register", {
        email: data.email,
        password: data.password,
      });

      alert("Account created!");
      navigate("/login");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
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
            <UserPlus className={styles.icon} />
          </div>
          <h1 className={styles.title}>Join Plannr</h1>
          <p className={styles.subtitle}>
            Create your account to start organizing
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Email */}
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

          {/* Password */}
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className={styles.footer}>
            <p>
              Already have an account?{" "}
              <Link to="/login" className={styles.link}>
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
