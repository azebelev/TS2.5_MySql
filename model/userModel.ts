import { VALUES, Task, UserObj } from '../interfaces/mysqlTypes';
import { Query } from './mysql';
import { ResultSetHeader } from 'mysql2';

class User {

  static async findOne(candidate: { login: string, pass: string }) {
    const values = [candidate.login, candidate.pass];
    const query = `SELECT * FROM users WHERE login=? AND pass=? `;
    const user = await Query(query, values);

    return (user as Array<UserObj>)[0];
  };

  static async addNewUser(user: { login: string, pass: string }) {
    const values = [user.login, user.pass];
    const query = 'INSERT INTO users(login,pass) VALUES(?, ?) ';

    await Query(query, values);
  };

  static async findById(user_id: number | undefined) {
    const query = 'SELECT * FROM users WHERE id=?';
    const user = await Query(query, user_id);

    return (user as Array<UserObj>)[0];
  };

  static async findTasksByUserId(user_id: number | undefined) {
    const query =
      `SELECT tasks.id,tasks.text,tasks.checked 
    FROM tasks
    INNER JOIN users_tasks
    ON tasks.id=users_tasks.task_id
    INNER JOIN users 
    ON users_tasks.user_id = users.id
    AND users.id=? `;
    const tasks = await Query(query, user_id);

    return (tasks as Array<Task>);
  };

  static async addNewTask(text: string, user_id: number | undefined) {
    let values: VALUES = [text, false];
    let query = 'INSERT INTO tasks(text,checked) VALUES(?, ?) ';
    const res = await Query(query, values);
    const task_id = (res as ResultSetHeader).insertId;
    query = 'INSERT INTO users_tasks(user_id,task_id) VALUES(?, ?)';
    values = [user_id, task_id];
    await Query(query, values);

    return task_id;
  }

  static async deleteTaskById(task_id: number) {
    const query = 'DELETE FROM tasks WHERE id=?';
    await Query(query, task_id);
  }

  static async updateTask(task: Task) {
    const query = 'UPDATE tasks SET text=?,checked=? WHERE id=?';
    const values: VALUES = [task.text, task.checked, task.id];
    await Query(query, values);
  };

};

export { User };