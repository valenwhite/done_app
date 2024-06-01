import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

const userId = 1;

async function getTasks(user_id) {
    const [rows] = await pool.query(`SELECT * FROM tasks WHERE user_id = ${user_id}`);
    return rows;
};

const tasks = await getTasks(userId);
console.log(tasks);


async function getUser(user_id) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE user_id = ${user_id}`);
    return rows;
};

const user = await getUser(userId);
console.log(user);


