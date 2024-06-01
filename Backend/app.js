import express from 'express';
import { getUser, getAllTasks, getTasks, createTask, toggleTaskCompletion, deleteTask } from './server.js';

const app = express();

app.use(express.json());

app.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const tasks = await getTasks(id);
    console.log(tasks);
    res.send(tasks);
});

app.get("/test", async (req, res) => {
    res.send({message: 'Its working'});
});

app.post("/tasks", async (req, res) => {
    const { userId, title, date } = req.body;
    const task = await createTask(userId, title, date);
    res.status(201).send(task);
});

app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { complete } = req.body;
    const updatedTask = await toggleTaskCompletion(id, complete);
    res.send({ id, complete });
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