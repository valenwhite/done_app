import express from 'express';
import { getUser, getTasks, createTask, toggleTaskCompletion, deleteTask, updateTaskDetails } from './server.js';

const app = express();

app.use(express.json());

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await getTasks(id);
    res.send(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Something broke' });
  }
});

app.get("/test", async (req, res) => {
  res.send({ message: 'Its working' });
});

app.post("/tasks", async (req, res) => {
  const { userId, title, date } = req.body;
  try {
    const task = await createTask(userId, title, date);
    res.status(201).send(task);
  } catch (err) {
    res.status(500).json({ error: 'Something broke' });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, date, complete } = req.body;
  try {
    if (title !== undefined && date !== undefined) {
      const updatedTask = await updateTaskDetails(id, title, date);
      res.send(updatedTask);
    } else if (complete !== undefined) {
      const updatedTask = await toggleTaskCompletion(id, complete);
      res.send(updatedTask);
    } else {
      res.status(400).json({ error: 'Invalid request body' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Something broke' });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTask(id);
    res.send({ message: `Task ${id} has been deleted` });
  } catch (err) {
    res.status(500).json({ error: 'Something broke' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke' });
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
