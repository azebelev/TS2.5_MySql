import mysql from 'mysql2';
const dbConfig = {
  password: 'asd123',
  user: 'root',
  database: 'node-todo-min',
  host: 'localhost',
  port: 3306
};
const db = mysql.createConnection({ ...dbConfig, multipleStatements: true });





export { dbConfig, db };