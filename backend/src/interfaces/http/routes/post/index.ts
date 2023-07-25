import { Router, Request, Response} from "express";

const routes = Router();

routes.get("/post", (_, res: Response) => {
  res.sendFile("post-picture.html", {
    root: "./frontend/src/",
  });
});

routes.post("/post", (req: Request, res: Response) => {
  console.log(req.body);
});

export default routes;