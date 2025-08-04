import React, { useState } from "react";
import { Table, Button, Space, Tag, Popconfirm, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Task } from "../types/Task";
import dayjs from "dayjs";

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => Promise<void>;
  loading?: boolean;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onEdit,
  onDelete,
  loading = false,
}) => {
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  const handleDelete = async (taskId: string) => {
    setDeletingIds((prev) => [...prev, taskId]);
    try {
      await onDelete(taskId);
    } finally {
      setDeletingIds((prev) => prev.filter((id) => id !== taskId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green";
      case "in-progress":
        return "orange";
      case "pending":
        return "blue";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 250,
      ellipsis: true,
      render: (text: string) => text || "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.replace("-", " ").toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 100,
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)}>{priority.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      width: 120,
      render: (due_date: string) => {
        if (!due_date) return "-";

        const date = dayjs(due_date);
        const isOverdue = date.isBefore(dayjs(), "day");

        return (
          <Tooltip title={date.format("YYYY-MM-DD HH:mm")}>
            <span style={{ color: isOverdue ? "#ff4d4f" : undefined }}>
              <CalendarOutlined style={{ marginRight: 4 }} />
              {date.format("MMM DD")}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "createdAt",
      width: 120,
      render: (createdAt: string) =>
        dayjs(createdAt).format("DD MMM YYYY, HH:mm:ss"),
    },
    {
      title: "Updated",
      dataIndex: "updated_at",
      key: "updatedAt",
      width: 120,
      render: (updated_at: string) =>
        dayjs(updated_at).format("DD MMM YYYY, HH:mm:ss"),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: Task) => (
        <Space>
          <Tooltip title="Edit task">
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete task"
            description="Are you sure you want to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete task">
              <Button
                type="primary"
                danger
                size="small"
                icon={<DeleteOutlined />}
                loading={deletingIds.includes(record.id)}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} tasks`,
      }}
      scroll={{ x: 1000 }}
    />
  );
};

export default TaskTable;
