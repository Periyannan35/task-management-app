import axios from 'axios';

const REAL_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API = axios.create({ baseURL: REAL_BASE });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Mock fallback using localStorage for demo when backend is unreachable
const mock = {
  _usersKey: 'mock_users',
  _tasksKey: 'mock_tasks',

  _load(key) { return JSON.parse(localStorage.getItem(key) || '[]'); },
  _save(key, arr) { localStorage.setItem(key, JSON.stringify(arr)); },

  register({ name, email, password }) {
    const users = this._load(this._usersKey);
    if (users.find(u => u.email === email)) throw { response: { data: { error: 'Email already registered' } } };
    const user = { id: Date.now().toString(), name, email };
    users.push({ ...user, password });
    this._save(this._usersKey, users);
    const token = 'mock-token-' + user.id;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { data: { token, user } };
  },

  login({ email, password }) {
    const users = this._load(this._usersKey);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw { response: { data: { error: 'Invalid credentials' } } };
    const token = 'mock-token-' + user.id;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
    return { data: { token, user: { id: user.id, name: user.name, email: user.email } } };
  },

  getTasks() {
    return { data: this._load(this._tasksKey).sort((a,b)=>b.createdAt-a.createdAt) };
  },

  createTask({ title, description, status }){
    const tasks = this._load(this._tasksKey);
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const task = { _id: Date.now().toString(), userId: user?.id || 'anon', title, description, status: status||'pending', createdAt: Date.now(), updatedAt: Date.now() };
    tasks.push(task); this._save(this._tasksKey, tasks);
    return { data: task };
  },

  updateTask(id, body){
    const tasks = this._load(this._tasksKey);
    const idx = tasks.findIndex(t=>t._id===id);
    if (idx===-1) throw { response: { data: { error: 'Task not found' } } };
    tasks[idx] = { ...tasks[idx], ...body, updatedAt: Date.now() };
    this._save(this._tasksKey, tasks);
    return { data: tasks[idx] };
  },

  deleteTask(id){
    let tasks = this._load(this._tasksKey);
    tasks = tasks.filter(t=>t._id!==id);
    this._save(this._tasksKey, tasks);
    return { data: { message: 'Task deleted' } };
  }
};

export const registerUser = async (data) => {
  try{ const res = await API.post('/auth/register', data); return res; } catch(e){ return mock.register(data); }
};
export const loginUser = async (data) => {
  try{ const res = await API.post('/auth/login', data); return res; } catch(e){ return mock.login(data); }
};
export const createTask = async (data) => {
  try{ const res = await API.post('/tasks', data); return res; } catch(e){ return mock.createTask(data); }
};
export const getTasks = async () => {
  try{ const res = await API.get('/tasks'); return res; } catch(e){ return mock.getTasks(); }
};
export const updateTask = async (id, data) => {
  try{ const res = await API.put(`/tasks/${id}`, data); return res; } catch(e){ return mock.updateTask(id, data); }
};
export const deleteTask = async (id) => {
  try{ const res = await API.delete(`/tasks/${id}`); return res; } catch(e){ return mock.deleteTask(id); }
};

export default API;
