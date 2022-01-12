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
exports.Query = exports.CreateDb = void 0;
const database_1 = require("../utils/database");
const CreateDb = () => __awaiter(void 0, void 0, void 0, function* () {
    database_1.db.connect();
    const queryStringTodo = `CREATE TABLE IF NOT EXISTS tasks
    (id INT NOT NULL AUTO_INCREMENT,
    text VARCHAR(255) NOT NULL,
    checked BOOLEAN NOT NULL,
    PRIMARY KEY (id))
    ENGINE=InnoDB;`;
    const queryStringUsers = `CREATE TABLE IF NOT EXISTS users
    (id INT NOT NULL AUTO_INCREMENT,
    login VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    PRIMARY KEY (id))
    ENGINE=InnoDB;`;
    const queryStringTodoOfUsers = `CREATE TABLE IF NOT EXISTS users_tasks
    (id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    FOREIGN KEY (user_id) 
    REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) 
    REFERENCES tasks(id) ON DELETE CASCADE,
    PRIMARY KEY (id))
    ENGINE=InnoDB;`;
    try {
        database_1.db.query(queryStringTodo);
        database_1.db.query(queryStringUsers);
        database_1.db.query(queryStringTodoOfUsers);
    }
    catch (error) {
        console.log('error inside CreateDb', error);
    }
});
exports.CreateDb = CreateDb;
const Query = (query, values) => {
    database_1.db.connect();
    return new Promise((resolve, reject) => {
        database_1.db.query(query, values, (error, result) => {
            if (error) {
                console.log('error inside Query', error);
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};
exports.Query = Query;
