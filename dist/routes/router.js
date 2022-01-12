"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userModel_1 = require("../model/userModel");
router.all('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    switch (req.query.action) {
        case 'login': {
            const { login, pass } = req.body;
            const user = yield userModel_1.User.findOne({ login, pass });
            if (user) {
                req.session.user_id = user.id;
                req.session.save();
                res.status(200).send({ 'ok': true });
            }
            else {
                res.status(404).send({ 'error': 'not found' });
            }
            break;
        }
        case 'register': {
            const { login, pass } = req.body;
            const user = yield userModel_1.User.findOne({ login, pass });
            if (!user) {
                yield userModel_1.User.addNewUser({ login, pass });
                res.status(201).send({ 'ok': true });
            }
            else {
                res.status(400).send({});
            }
            break;
        }
        case 'getItems': {
            const user_id = req.session.user_id;
            if (!user_id) {
                res.status(403).send({ error: 'forbidden' });
            }
            else {
                const tasks = yield userModel_1.User.findTasksByUserId(user_id);
                res.status(200).send({ items: tasks });
            }
            break;
        }
        case 'deleteItem': {
            try {
                const { id } = req.body;
                yield userModel_1.User.deleteTaskById(id);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({});
            }
            res.status(200).send({ ok: true });
            break;
        }
        case 'createItem': {
            const { text } = req.body;
            const user_id = req.session.user_id;
            const task_id = yield userModel_1.User.addNewTask(text, user_id);
            res.status(201).send({ id: task_id });
            break;
        }
        case 'editItem': {
            try {
                const { id, text, checked } = req.body;
                yield userModel_1.User.updateTask({ id, text, checked });
                res.status(200).send({ ok: true });
            }
            catch (error) {
                res.status(500).send({});
            }
            break;
        }
        default: {
            req.session.destroy((error) => {
                if (!error)
                    res.clearCookie('connect.sid').json({ ok: true });
                res.status(200).send({ "ok": true });
            });
            break;
        }
    }
}));
exports.default = router;
