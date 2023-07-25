import { config } from "dotenv";

config();

export const ENV = {
  TEST_VAR: process.env.TEST_VAR,
};
