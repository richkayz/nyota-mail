export const env = {
  appName: import.meta.env.VITE_APP_NAME,
  apiUrl: import.meta.env.VITE_API_URL,
  version: import.meta.env.VITE_APP_VERSION,
} as const;