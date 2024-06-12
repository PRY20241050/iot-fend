import { Login } from "@/components/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión | IoT",
  description: "Iniciar sesión",
};

export default function IniciarSesionPage() {
  return <Login />;
}
