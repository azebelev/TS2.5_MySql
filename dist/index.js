"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./routes/login"));
const register_1 = __importDefault(require("./routes/register"));
const logout_1 = __importDefault(require("./routes/logout"));
const items_1 = __importDefault(require("./routes/items"));
const router_1 = __importDefault(require("./routes/router"));
const promise_1 = __importDefault(require("mysql2/promise"));
const session = __importStar(require("express-session"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const database_1 = require("./utils/database");
const mysql_1 = require("./model/mysql");
const StoreSql = (0, express_mysql_session_1.default)(session);
const cors_1 = __importDefault(require("cors"));
const pool = promise_1.default.createPool(Object.assign(Object.assign({}, database_1.dbConfig), { connectionLimit: 10 }));
const store = new StoreSql({
    schema: {
        tableName: 'my_sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'user_id'
        }
    }
}, pool);
const app = (0, express_1.default)();
const PORT = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(session.default({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use('/api/v1/items', items_1.default);
app.use('/api/v1/login', login_1.default);
app.use('/api/v1/logout', logout_1.default);
app.use('/api/v1/register', register_1.default);
app.use('/api/v2/router', router_1.default);
function startServing() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mysql_1.CreateDb)();
        app.listen(PORT, () => {
            console.log(`server on port ${PORT}`);
        });
    });
}
startServing();
