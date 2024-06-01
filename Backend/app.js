import express from 'express';
import { getUser, getAllTasks, getTask, createTask, toggleTaskCompletion, deleteTask } from './server.js';

const app = express();

app.use(express.json());

app.get("/tasks", async (req, res) => {
    const tasks = await getAllTasks();
    res.send(tasks)
});


app.post("/tasks", async (req, res) => {
    const { userId, title, date } = req.body;
    const task = await createTask(userId, title, date);
    res.status(201).send(task);
});

app.put("/tasks/:id", async (req, res) => {
    const { id, complete } = req.params;
    const updatedTask = await toggleTaskCompletion(id, complete);
    res.send(updatedTask);
});

app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    await deleteTask(id);
    res.send({ message: `Task ${id} has been deleted` });
});


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
});

app.listen(8080, (err, req, res, next) => {
    console.log('Server listening on port 8080')
});