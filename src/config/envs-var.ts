import { get } from "env-var";
import "dotenv/config"; 

export const envs = {
  PORT: get("PORT").required().default("8080").asPortNumber(),
};
