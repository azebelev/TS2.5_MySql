import { db } from '../utils/database';
import { VALUES } from '../interfaces/mysqlTypes';

const CreateDb = async () => {
    db.connect();
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
        db.query(queryStringTodo);
        db.query(queryStringUsers);
        db.query(queryStringTodoOfUsers);
    } catch (error) {
        console.log('error inside CreateDb', error);
    }

}

const Query = (query: string, values: VALUES | undefined | number) => {

    db.connect();
    return new Promise((resolve, reject) => {

        db.query(query, values, (error, result) => {
            if (error) {
                console.log('error inside Query', error);
                reject(error);
                return;
            }

            resolve(result);
        });
    });
};


export { CreateDb, Query };
