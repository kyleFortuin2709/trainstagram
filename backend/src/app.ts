import express from "express";
import db from "./infrastructure/models";
import { router as userRoutes } from './app/routes/user.js';
import { router as postRoutes } from './app/routes/post.js';

import { ENV } from "./infra/env/index.js";
import { connectToDatabase } from "./infrastructure/database/connectToDatabase.js";

const PORT = ENV.PORT;
const app = express();

process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

db.sequelize.sync();
connectToDatabase();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(express.static("./frontend/src", { extensions: ["html"] }));
app.use('/frontend', express.static('./frontend/src', {extensions: ["js", "css", "png"]}));

app.use("/", userRoutes);
app.use("/", postRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
