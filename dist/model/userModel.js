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
exports.User = void 0;
const mysql_1 = require("./mysql");
class User {
    static findOne(candidate) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [candidate.login, candidate.pass];
            const query = `SELECT * FROM users WHERE login=? AND pass=? `;
            const user = yield (0, mysql_1.Query)(query, values);
            return user[0];
        });
    }
    ;
    static addNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [user.login, user.pass];
            const query = 'INSERT INTO users(login,pass) VALUES(?, ?) ';
            yield (0, mysql_1.Query)(query, values);
        });
    }
    ;
    static findById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE id=?';
            const user = yield (0, mysql_1.Query)(query, user_id);
            return user[0];
        });
    }
    ;
    static findTasksByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT tasks.id,tasks.text,tasks.checked 
    FROM tasks
    INNER JOIN users_tasks
    ON tasks.id=users_tasks.task_id
    INNER JOIN users 
    ON users_tasks.user_id = users.id
    AND users.id=? `;
            const tasks = yield (0, mysql_1.Query)(query, user_id);
            return tasks;
        });
    }
    ;
    static addNewTask(text, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let values = [text, false];
            let query = 'INSERT INTO tasks(text,checked) VALUES(?, ?) ';
            const res = yield (0, mysql_1.Query)(query, values);
            const task_id = res.insertId;
            query = 'INSERT INTO users_tasks(user_id,task_id) VALUES(?, ?)';
            values = [user_id, task_id];
            yield (0, mysql_1.Query)(query, values);
            return task_id;
        });
    }
    static deleteTaskById(task_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM tasks WHERE id=?';
            yield (0, mysql_1.Query)(query, task_id);
        });
    }
    static updateTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE tasks SET text=?,checked=? WHERE id=?';
            const values = [task.text, task.checked, task.id];
            yield (0, mysql_1.Query)(query, values);
        });
    }
    ;
}
exports.User = User;
;
