import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// User Functions

export async function getUser(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM users 
        WHERE user_id = ?
        `, [id]);
    return rows;
};

export async function createUser(name, email, password) {
    const result = await pool.query(`
        INSERT INTO users (name, email, pasword) 
        VALUES (?, ?, ?)
        `, [name, email, password]);
    const id = result.insertId;
    return getUser(id);
};

// Task Related Functions

export async function getTasks(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM tasks 
        WHERE user_id = ?
        `, [id]);
    return rows;
};

export async function getTask(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM tasks 
        WHERE task_id = ?
        `, [id]);
    return rows[0];
};

export async function createTask(userId, title, date) {
    const result = await pool.query(`
        INSERT INTO tasks (user_id, title, date) 
        VALUES (?, ?, ?)
        `, [userId, title, date]);
    const id = result[0].insertId;
    return getTask(id);
};

export async function updateTaskDetails(id, title, date) {
    await pool.query(`
        UPDATE tasks 
        SET title = ?, date = ?
        WHERE task_id = ?
        `, [title, date, id]);
    return getTask(id);
};

export async function toggleTaskCompletion(id, complete) {
    await pool.query(`
        UPDATE tasks 
        SET complete = ?
        WHERE task_id = ?
        `, [complete, id]);
    return getTask(id);
};

export async function deleteTask(id) {
    const result = await pool.query(`
        DELETE FROM tasks 
        WHERE task_id = ?
        `, [id]);
    return result.affectedRows;
};
