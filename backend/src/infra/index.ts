import { config } from "dotenv";
import * as mysql from 'mysql2/promise';

config();

export const ENV = {
  TEST_VAR: process.env.TEST_VAR,
};

export const db_config : mysql.ConnectionOptions = {
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}