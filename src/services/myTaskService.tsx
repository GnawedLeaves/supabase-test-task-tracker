import { supabase } from "../supabase-client";
import { CreateTaskRequest, Task } from "../types/Task";

export const createTask = async (taskData: CreateTaskRequest) => {
  try {
    const { status, statusText, error } = await supabase
      .from("tasks")
      .insert(taskData)
      .single();

    if (error) console.error("error adding task", error);

    console.log({ status, statusText });
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error getting tasks", error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error("Error getting tasks", e);
    return [];
  }
};

export const deleteTask = async (id: string) => {
  try {
    const { data, error } = await supabase.from("tasks").delete().eq("id", id);
    return data;
  } catch (e) {
    console.error("Error deleting task", e);
  }
};

export const updateTask = async (
  id: string,
  updatedTask: CreateTaskRequest
) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .update({ ...updatedTask })
      .eq("id", id);
    return data;
  } catch (e) {
    console.error("Error deleting task", e);
  }
};
