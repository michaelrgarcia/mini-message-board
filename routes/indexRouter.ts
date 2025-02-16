import { Router, Request, Response } from "express";

const indexRouter = Router();

const messages = [
  {
    text: "hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "hello world",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req: Request, res: Response) => {
  res.render("index", { messages: messages });
});

indexRouter.get("/new", (req: Request, res: Response) => {
  res.render("form");
});

indexRouter.post("/new", (req: Request, res: Response) => {
  const { msg, user } = req.body;

  messages.push({
    text: msg,
    user,
    added: new Date(),
  });

  res.redirect("/");
});

export default indexRouter;
