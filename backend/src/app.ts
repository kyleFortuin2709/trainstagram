import express from "express";

import { ENV } from "./infra/env";

import loginRouter from "./interfaces/http/login/router";

const PORT = ENV.PORT;
const app = express();

app.use(express.static("./frontend/src", { extensions: ["html"] }));

app.use(loginRouter);

app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`);
});
