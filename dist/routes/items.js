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
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.session.user_id;
    if (!user_id) {
        res.status(403).send({ error: 'forbidden' });
    }
    else {
        const tasks = yield userModel_1.User.findTasksByUserId(user_id);
        res.status(200).send({ items: tasks });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    const user_id = req.session.user_id;
    const task_id = yield userModel_1.User.addNewTask(text, user_id);
    res.status(201).send({ id: task_id });
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield userModel_1.User.deleteTaskById(id);
    }
    catch (error) {
        res.status(500).send({});
    }
    res.status(200).send({ ok: true });
}));
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, text, checked } = req.body;
        yield userModel_1.User.updateTask({ id, text, checked });
        res.status(200).send({ ok: true });
    }
    catch (error) {
        res.status(500).send({});
    }
}));
exports.default = router;
