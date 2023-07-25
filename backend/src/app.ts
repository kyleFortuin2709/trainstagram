import express from "express";

import { ENV } from "./infra/env";

import loginRoutes from "./interfaces/http/routes/login";

const PORT = ENV.PORT;
const app = express();

app.use(express.static("./frontend/src", { extensions: ["html"] }));

app.use(loginRoutes);

app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`);
});
