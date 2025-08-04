import { Task, CreateTaskRequest, UpdateTaskRequest } from "../types/Task";

// This is where you'll implement your actual API calls to Supabase
// For now, we'll use mock data and localStorage for demonstration

class TaskService {
  private storageKey = "tasks";

  // Mock data for initial display
  private mockTasks: Task[] = [
    {
      id: "1",
      title: "Setup Supabase Database",
      description: "Create tables and configure database schema",
      status: "completed",
      priority: "high",
      dueDate: "2025-08-05T10:00:00Z",
      createdAt: "2025-08-01T09:00:00Z",
      updatedAt: "2025-08-01T09:00:00Z",
    },
    {
      id: "2",
      title: "Implement Authentication",
      description: "Add user login and registration functionality",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-08-10T15:00:00Z",
      createdAt: "2025-08-02T10:00:00Z",
      updatedAt: "2025-08-02T10:00:00Z",
    },
    {
      id: "3",
      title: "Design Task Dashboard",
      description: "Create responsive UI for task management",
      status: "pending",
      priority: "medium",
      createdAt: "2025-08-03T11:00:00Z",
      updatedAt: "2025-08-03T11:00:00Z",
    },
  ];

  constructor() {
    // Initialize with mock data if no data exists
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.mockTasks));
    }
  }

  // GET /tasks - Fetch all tasks
  async getAllTasks(): Promise<Task[]> {
    try {
      // TODO: Replace with actual Supabase query
      // const { data, error } = await supabase
      //   .from('tasks')
      //   .select('*')
      //   .order('created_at', { ascending: false });

      // if (error) throw error;
      // return data || [];

      // Mock implementation using localStorage
      const tasks = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      return new Promise((resolve) => {
        setTimeout(() => resolve(tasks), 500); // Simulate API delay
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  // POST /tasks - Create a new task
  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    try {
      // TODO: Replace with actual Supabase insert
      // const { data, error } = await supabase
      //   .from('tasks')
      //   .insert([taskData])
      //   .select()
      //   .single();

      // if (error) throw error;
      // return data;

      // Mock implementation
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const tasks = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      tasks.unshift(newTask);
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));

      return new Promise((resolve) => {
        setTimeout(() => resolve(newTask), 500); // Simulate API delay
      });
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  // PUT /tasks/:id - Update an existing task
  async updateTask(taskData: UpdateTaskRequest): Promise<Task> {
    try {
      // TODO: Replace with actual Supabase update
      // const { data, error } = await supabase
      //   .from('tasks')
      //   .update({
      //     ...taskData,
      //     updated_at: new Date().toISOString()
      //   })
      //   .eq('id', taskData.id)
      //   .select()
      //   .single();

      // if (error) throw error;
      // return data;

      // Mock implementation
      const tasks = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      const index = tasks.findIndex((task: Task) => task.id === taskData.id);

      if (index === -1) {
        throw new Error("Task not found");
      }

      const updatedTask = {
        ...tasks[index],
        ...taskData,
        updatedAt: new Date().toISOString(),
      };

      tasks[index] = updatedTask;
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));

      return new Promise((resolve) => {
        setTimeout(() => resolve(updatedTask), 500); // Simulate API delay
      });
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  // DELETE /tasks/:id - Delete a task
  async deleteTask(taskId: string): Promise<void> {
    try {
      // TODO: Replace with actual Supabase delete
      // const { error } = await supabase
      //   .from('tasks')
      //   .delete()
      //   .eq('id', taskId);

      // if (error) throw error;

      // Mock implementation
      const tasks = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      const filteredTasks = tasks.filter((task: Task) => task.id !== taskId);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredTasks));

      return new Promise((resolve) => {
        setTimeout(() => resolve(), 500); // Simulate API delay
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  // GET /tasks/:id - Get a single task by ID
  async getTaskById(taskId: string): Promise<Task | null> {
    try {
      // TODO: Replace with actual Supabase query
      // const { data, error } = await supabase
      //   .from('tasks')
      //   .select('*')
      //   .eq('id', taskId)
      //   .single();

      // if (error) throw error;
      // return data;

      // Mock implementation
      const tasks = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
      const task = tasks.find((task: Task) => task.id === taskId);

      return new Promise((resolve) => {
        setTimeout(() => resolve(task || null), 500); // Simulate API delay
      });
    } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
    }
  }
}

export const taskService = new TaskService();
