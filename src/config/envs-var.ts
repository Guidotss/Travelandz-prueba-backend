import { get } from "env-var";
import "dotenv/config"; 

export const envs = {
  PORT: get("PORT").required().default("8080").asPortNumber(),
  API_KEY: get("API_KEY").required().asString(),
  SECRET_KEY: get("SECRET_KEY").required().asString(),
};
