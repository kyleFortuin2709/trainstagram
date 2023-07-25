import { Router } from "express";

const router = Router();

router.get("/login", (_, res) => {
  res.sendFile("login.html", {
    root: "./frontend/src/",
  });
});

export default router;
