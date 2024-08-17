export const BAD_REQUEST = 400;

export const DEFAULT_MESSAGE = "Ocurrió un error, por favor intente nuevamente";

export const RADIAN = Math.PI / 180;

// 1 minute 30 sec (1000 * 60 * 1.5)
export const GAUGE_REVALIDATION_INTERVAL = 90000;

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
export const historialBrickyardPath = (id: string) => `/ladrillera/${id}/historial`;
export const dashboardBrickyardPath = (id: string) => `/ladrillera/${id}/dashboard`;

export const LOGIN_PATH = "/auth/iniciar-sesion";
export const RECUPERAR_CONTRASENA_PATH = "/auth/recuperar-contrasena";
