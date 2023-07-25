import express, {Express} from 'express';

import { ENV } from "./infra/env";

import postRoutes from "./interfaces/http/routes/post";

import loginRoutes from "./interfaces/http/routes/login";

const PORT = ENV.PORT;
const app : Express = express();

app.use(express.static("./frontend/src", { extensions: ["html"] }));
app.use('/frontend', express.static('./frontend/src', {extensions: ["js", "css", "png"]}));

app.use(postRoutes);
app.use(loginRoutes);

app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`);
});