import { useEffect, useState } from "react";
import { END_POINT } from "../constanst";
import { Task } from "../types";

export const useTask = () => {
  const [isLoading, setLoading] = useState(false);
  const [allTasks, setTask] = useState<Task[]>([]);
  const [error, setError] = useState<unknown>(null);

  const getTodo = async () => {
    try {
      const res = await fetch(END_POINT + "/tasks");
      const data = await res.json();
      setTask(data);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };

  const updateTodo = (id: number, updatedTaskProperties: Task) => {
    const updatedTasks = allTasks.map((task) => {
      if (task.todoId === id) {
        return { ...task, ...updatedTaskProperties };
      }
      return task;
    });

    setTask(updatedTasks);
  };

  const removeTodo = (id: number) => {
    const updatedTasks = allTasks.filter((task) => task.todoId !== id);
    setTask(updatedTasks);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(END_POINT + "/tasks");
        const data = await res.json();
        setTask(data.data);
      } catch (e) {
        setError(e);
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    data: allTasks,
    error,
    updateData: setTask,
    getTodo,
    setTask,
    removeTodo,
    updateTodo,
  };
};
