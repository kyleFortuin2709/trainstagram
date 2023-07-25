import { Router } from "express";

const routes = Router();

routes.get("/login", (_, res) => {
  res.sendFile("login.html", {
    root: "./frontend/src/",
  });
});

export default routes;
