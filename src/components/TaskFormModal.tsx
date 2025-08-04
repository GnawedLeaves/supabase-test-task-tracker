import React, { useState } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import { CreateTaskRequest } from "../types/Task";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

interface TaskFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (task: CreateTaskRequest) => Promise<void>;
  title: string;
  initialValues?: Partial<CreateTaskRequest>;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  title,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const taskData: CreateTaskRequest = {
        ...values,
        dueDate: values.dueDate
          ? dayjs(values.dueDate).toISOString()
          : undefined,
        updated_at: new Date().toISOString(),
      };

      await onSubmit(taskData);
      form.resetFields();
      onCancel();
      message.success(
        `Task ${initialValues ? "updated" : "created"} successfully!`
      );
    } catch (error) {
      console.error("Error submitting task:", error);
      message.error("Failed to submit task");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={title}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText={initialValues ? "Update" : "Create"}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...initialValues,
          dueDate: initialValues?.dueDate
            ? dayjs(initialValues.dueDate)
            : undefined,
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={3} placeholder="Enter task description (optional)" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select status">
            <Option value="pending">Pending</Option>
            <Option value="in-progress">In Progress</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please select a priority" }]}
        >
          <Select placeholder="Select priority">
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date">
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Select due date (optional)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskFormModal;
