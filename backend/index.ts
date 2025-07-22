import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

export interface Task {
  id: number;
  name: string;
  description: string;
  status: 'pending' | 'done' | 'todo';
}

// Mock data with ids
let tasks: Task[] = [
  { id: 1, name: "Initialize app", description: "Start project structure", status: "done" },
  { id: 2, name: "Set up routes", description: "Add Express routes", status: "pending" },
  { id: 3, name: "Add Auth", description: "Implement login", status: "todo" },
  { id: 4, name: "Write docs", description: "Create API docs", status: "todo" },
  { id: 5, name: "Test APIs", description: "Unit test endpoints", status: "pending" },
  { id: 6, name: "Deploy app", description: "Push to server", status: "todo" }
];

// Auto increment id tracker
let nextId = tasks.length + 1;

// Default endpoint
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from Task API!');
});

// GET /tasks?status=pending&limit=3&page=1
app.get('/tasks', (req: Request, res: Response) => {
  const { status, limit = '5', page = '1' } = req.query;
  let filtered = tasks;

  if (status && typeof status === 'string') {
    filtered = filtered.filter(task => task.status === status);
  }

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  const start = (pageNumber - 1) * limitNumber;
  const end = start + limitNumber;

  res.json({
    total: filtered.length,
    page: pageNumber,
    limit: limitNumber,
    data: filtered.slice(start, end),
  });
});

// POST /tasks
app.post('/tasks', (req: Request, res: Response) => {
  const { name, description, status } = req.body;
  if (!name || !description || !['pending', 'done', 'todo'].includes(status)) {
    return res.status(400).json({ message: "Invalid task data" });
  }
  const newTask: Task = { id: nextId++, name, description, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id
app.put('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { name, description, status } = req.body;
  if (name) tasks[index].name = name;
  if (description) tasks[index].description = description;
  if (status && ['pending', 'done', 'todo'].includes(status)) {
    tasks[index].status = status;
  }

  res.json(tasks[index]);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  const removed = tasks.splice(index, 1)[0];
  res.json(removed);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
