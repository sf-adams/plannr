import React from "react";
import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}
