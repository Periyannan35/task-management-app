import Task from '../models/Task.js';

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });

    const task = new Task({ userId: req.userId, title, description, status });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task || task.userId.toString() !== req.userId) return res.status(404).json({ error: 'Task not found' });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task || task.userId.toString() !== req.userId) return res.status(404).json({ error: 'Task not found' });

    await Task.deleteOne({ _id: id });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
