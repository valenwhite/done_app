import React, { createContext, useState, useEffect } from 'react';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:8080/tasks/1');
        const data = await res.json();
        const tasksWithDateObjects = data.map(task => ({
          ...task,
          date: new Date(task.date),
        }));
        setTasks(tasksWithDateObjects);
        setLoading(false);
      } catch (err) {
        console.log('Error:', err);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    // Add task to backend and update state
  };

  const updateTask = async (taskId, updatedTask) => {
    // Update task in backend and update state
  };

  const deleteTask = async (taskId) => {
    // Delete task from backend and update state
  };

  return (
    <TasksContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask, loading }}>
      {children}
    </TasksContext.Provider>
  );
};
