export const STATUS_CODES = {
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
}

export const DEFAULT_ERROR = {
  header: "Ocurrió un error",
  server: "El servidor no responde.",
  message: "Ocurrió un error, por favor intente nuevamente",
  emailNotFound: "No se encontró una cuenta con este correo electrónico",
}

export const RADIAN = Math.PI / 180;

export const REVALIDATION_TIME_IN_SECONDS = Number(
  process.env.NEXT_PUBLIC_REVALIDATION_TIME_IN_SECONDS ?? 120
)
export const REVALIDATION_INTERVAL_IN_MILISECONDS = 1000 * REVALIDATION_TIME_IN_SECONDS;

// Gas types
export const CO = 1;
export const NO2 = 2;
export const SO2 = 3;
export const PM25 = 4;
export const PM10 = 5;

// Paths
export const HOME_PATH = "/home";
export const DASHBOARD_PATH = "/dashboard";
export const HISTORIAL_PATH = "/historial";
export const LIMITE_EMISIONES_PATH = "/limite-emisiones";
export const CREAR_LIMITE_EMISIONES_PATH = "/limite-emisiones/agregar";
export const PERFIL_PATH = "/perfil";
export const CAMBIAR_CONTRASENA_PATH = "/perfil/cambiar-contrasena";

export const brickyardByIdPath = (id: string) => `/ladrillera/${id}`;
export const historialBrickyardPath = (id: string) =>
  `/ladrillera/${id}/historial`;
export const dashboardBrickyardPath = (id: string) =>
  `/ladrillera/${id}/dashboard`;
export const limiteEmisionesBrickyardPath = (id: string) =>
  `/ladrillera/${id}/limite-emisiones`;

export const LOGIN_PATH = "/auth/iniciar-sesion";
export const RECUPERAR_CONTRASENA_PATH = "/auth/recuperar-contrasena";
