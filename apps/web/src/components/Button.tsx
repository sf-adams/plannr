import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./button.module.css";

interface ButtonProps {
  children: ReactNode;
  variant?: "hero" | "outline";
  size?: "xl" | "md" | "sm";
  className?: string;
}

export const Button = ({
  children,
  variant = "hero",
  size = "md",
  className,
}: ButtonProps) => {
  const combinedClassName = clsx(
    styles.button,
    styles[variant],
    styles[size],
    className
  );

  return <button className={combinedClassName}>{children}</button>;
};
