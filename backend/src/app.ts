
import express from "express";
import { SequelizeConnection } from './infrastructure/database/SequelizeConnection';
import db from "./infrastructure/models";
import { router as userRoutes } from './app/controller/user';

import { ENV } from "./infra/env";

console.log("Hello, World!");

console.log(ENV.TEST_VAR);

const app = express();

process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

db.sequelize.sync({ force: true })
SequelizeConnection.getInstance();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use("/", userRoutes);

const server = app.listen(8080, () => {
  console.log(`Server started on PORT: 8080 in ${process.env.NODE_ENV}`);
});