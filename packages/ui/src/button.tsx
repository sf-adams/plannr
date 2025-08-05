import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button className={className} onClick={() => alert(`Hello from Plannr!`)}>
      {children}
    </button>
  );
};
