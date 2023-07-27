import express from "express";
import { userRoutes } from './app/routes/user';
import { postRoutes } from './app/routes/post';
import { viewRoutes } from "./app/routes/views";
import { ENV } from "./infrastructure/env/index";
import { connectToDatabase } from "./infrastructure/database/connectToDatabase";

const PORT = ENV.PORT;
const app = express();

process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

// db.sequelize.sync({ force: false });
connectToDatabase();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(express.static("./frontend/src", { extensions: ["html"] }));
app.use('/frontend', express.static('./frontend/src', {extensions: ["js", "css", "png"]}));

app.use(viewRoutes);
app.use(userRoutes);
app.use(postRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
