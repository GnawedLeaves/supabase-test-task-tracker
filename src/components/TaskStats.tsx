import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Task } from "../types/Task";

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "completed").length,
    inProgress: tasks.filter((task) => task.status === "in-progress").length,
    pending: tasks.filter((task) => task.status === "pending").length,
    highPriority: tasks.filter((task) => task.priority === "high").length,
  };

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Total Tasks"
            value={stats.total}
            valueStyle={{ color: "#1890ff" }}
            prefix={<ExclamationCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Completed"
            value={stats.completed}
            valueStyle={{ color: "#52c41a" }}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="In Progress"
            value={stats.inProgress}
            valueStyle={{ color: "#faad14" }}
            prefix={<SyncOutlined spin />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Pending"
            value={stats.pending}
            valueStyle={{ color: "#1890ff" }}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="High Priority"
            value={stats.highPriority}
            valueStyle={{ color: "#ff4d4f" }}
            prefix={<ExclamationCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Completion Rate"
            value={completionRate}
            suffix="%"
            valueStyle={{
              color:
                completionRate >= 70
                  ? "#52c41a"
                  : completionRate >= 40
                  ? "#faad14"
                  : "#ff4d4f",
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default TaskStats;
