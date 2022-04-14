import express from 'express';
import login from './routes/login';
import register from './routes/register';
import logout from './routes/logout';
import items from './routes/items';
import router from './routes/router';
import mysql from 'mysql2/promise';
import * as session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { dbConfig } from './utils/database';
import { CreateDb } from './model/mysql';
const StoreSql = MySQLStore(session);
import cors from 'cors'

const pool = mysql.createPool({ ...dbConfig, connectionLimit: 10 });
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



const app = express();
const PORT = 8080;


app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session.default({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}));

app.use('/api/v1/items', items);
app.use('/api/v1/login', login);
app.use('/api/v1/logout', logout);
app.use('/api/v1/register', register);
app.use('/api/v2/router', router);

async function startServing() {

  await CreateDb();

  app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
  })

}

startServing();

