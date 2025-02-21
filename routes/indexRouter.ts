import { Router, Request, Response } from "express";

import { getMessageById, getMessages, insertMessage } from "../db/queries.js";

const indexRouter = Router();

indexRouter.get("/", async (req: Request, res: Response) => {
  const messages = await getMessages();

  res.render("index", { messages: messages });
});

indexRouter.get("/new", (req: Request, res: Response) => {
  res.render("form");
});

indexRouter.post("/new", async (req: Request, res: Response) => {
  const { msg, user } = req.body;

  await insertMessage(user, msg, new Date());

  res.redirect("/");
});

indexRouter.get("/message/:msgIndex", async (req: Request, res: Response) => {
  const matchingMessage = await getMessageById(Number(req.params.msgIndex));

  const { text, username, added } = matchingMessage;

  res.render("message", {
    message: { author: username, text, added: new Date(added) },
  });
});

export default indexRouter;
