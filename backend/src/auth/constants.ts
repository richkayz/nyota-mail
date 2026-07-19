export const jwtConstants = {
  secret: process.env.JWT_SECRET || "development-secret",
  refreshSecret:
    process.env.JWT_REFRESH_SECRET || "development-refresh-secret",
};