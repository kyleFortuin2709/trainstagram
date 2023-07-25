import express, {Express, Request, Response} from 'express';

import { ENV } from "./infra/env";

import postRoutes from "./interfaces/http/routes/post";

import loginRoutes from "./interfaces/http/routes/login";

const PORT = ENV.PORT;
const app : Express = express();



app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false}));

app.use(express.static("./frontend/src", { extensions: ["html"] }));
app.use('/frontend', express.static('./frontend/src', {extensions: ["js", "css", "png"]}));

app.use(loginRoutes);

app.use(postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
