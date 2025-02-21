var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { getMessageById, getMessages, insertMessage } from "../db/queries.js";
const indexRouter = Router();
indexRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield getMessages();
    res.render("index", { messages: messages });
}));
indexRouter.get("/new", (req, res) => {
    res.render("form");
});
indexRouter.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { msg, user } = req.body;
    yield insertMessage(user, msg, new Date());
    res.redirect("/");
}));
indexRouter.get("/message/:msgIndex", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matchingMessage = yield getMessageById(Number(req.params.msgIndex));
    const { text, username, added } = matchingMessage;
    res.render("message", {
        message: { author: username, text, added: new Date(added) },
    });
}));
export default indexRouter;
