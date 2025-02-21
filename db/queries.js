var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pool from "./pool.js";
export function getMessageById(msgIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield pool.query("SELECT * FROM messages WHERE id = $1", [
            msgIndex,
        ]);
        return rows[0];
    });
}
export function getMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield pool.query("SELECT * FROM messages");
        return rows;
    });
}
export function insertMessage(username, message, dateAdded) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pool.query("INSERT INTO messages (username, text, added) VALUES ($1, $2, $3)", [username, message, dateAdded.toISOString()]);
    });
}
