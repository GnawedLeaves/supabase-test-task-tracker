import React, { useState, useEffect, useMemo } from "react";
import { Layout, Button, Typography, Space, message } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import TaskFormModal from "./components/TaskFormModal";
import TaskTable from "./components/TaskTable";
import TaskStats from "./components/TaskStats";
import TaskFilters from "./components/TaskFilters";
import { Task, CreateTaskRequest, UpdateTaskRequest } from "./types/Task";
import "./App.css";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./services/myTaskService";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasks();
      console.log({ fetchedTasks });
      setTasks(fetchedTasks);
    } catch (error) {
      message.error("Failed to load tasks");
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskRequest) => {
    try {
      const newTask = await createTask(taskData);
      console.log({ newTask });
      loadTasks();
    } catch (error) {
      message.error("Failed to create task");
      throw error;
    }
  };

  const handleUpdateTask = async (taskData: CreateTaskRequest) => {
    if (!editingTask) return;

    try {
      const updatedTask = await updateTask(editingTask.id, taskData);
      loadTasks();
      // setTasks((prev) =>
      //   prev.map((task) => (task.id === editingTask.id ? updatedTask : task))
      // );
    } catch (error) {
      message.error("Failed to update task");
      throw error;
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const deleteRes = await deleteTask(taskId);
      console.log({ deleteRes });
      loadTasks();
      // setTasks((prev) => prev.filter((task) => task.id !== taskId));
      message.success("Task deleted successfully");
    } catch (error) {
      message.error("Failed to delete task");
      throw error;
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingTask(null);
  };

  // Filter tasks based on search term and filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        searchTerm === "" ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === "" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
            Task Tracker
          </Title>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={loadTasks}
              loading={loading}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Add Task
            </Button>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: "24px" }}>
        <TaskStats tasks={tasks} />

        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <TaskFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
          />

          <TaskTable
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            loading={loading}
          />
        </div>
      </Content>

      <TaskFormModal
        visible={modalVisible}
        onCancel={handleModalClose}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        title={editingTask ? "Edit Task" : "Create New Task"}
        initialValues={
          editingTask
            ? {
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status,
                priority: editingTask.priority,
                dueDate: editingTask.dueDate,
              }
            : undefined
        }
      />
    </Layout>
  );
}

export default App;
