import { get } from "env-var";
import "dotenv/config";

export const envs = {
  PORT: get("PORT").required().default("8080").asPortNumber(),
  API_KEY_TRANSFERS: get("API_KEY_TRANSFERS").required().asString(),
  SECRET_KEY_TRANSFERS: get("SECRET_KEY_TRANSFERS").required().asString(),
  API_KEY_HOTELS: get("API_KEY_HOTELS").required().asString(),
  SECRET_KEY_HOTELS: get("SECRET_KEY_HOTELS").required().asString(),
  BASE_URL: get("BASE_URL").required().asString(),
  JWT_SECRET: get("JWT_SECRET").required().asString(),
};
