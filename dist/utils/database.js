"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.dbConfig = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dbConfig = {
    password: 'asd123',
    user: 'root',
    database: 'node-todo-min',
    host: 'localhost',
    port: 3306
};
exports.dbConfig = dbConfig;
const db = mysql2_1.default.createConnection(dbConfig);
exports.db = db;
