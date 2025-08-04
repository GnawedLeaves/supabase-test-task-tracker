import React from "react";
import { Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

interface TaskFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}) => {
  return (
    <Space style={{ marginBottom: 16, width: "100%" }} wrap>
      <Input
        placeholder="Search tasks..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: 200 }}
        allowClear
      />

      <Select
        placeholder="Filter by status"
        value={statusFilter}
        onChange={onStatusFilterChange}
        style={{ width: 150 }}
        allowClear
      >
        <Option value="">All Statuses</Option>
        <Option value="pending">Pending</Option>
        <Option value="in-progress">In Progress</Option>
        <Option value="completed">Completed</Option>
      </Select>

      <Select
        placeholder="Filter by priority"
        value={priorityFilter}
        onChange={onPriorityFilterChange}
        style={{ width: 150 }}
        allowClear
      >
        <Option value="">All Priorities</Option>
        <Option value="low">Low</Option>
        <Option value="medium">Medium</Option>
        <Option value="high">High</Option>
      </Select>
    </Space>
  );
};

export default TaskFilters;
