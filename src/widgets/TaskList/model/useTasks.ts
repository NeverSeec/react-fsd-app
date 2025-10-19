import { useState, useMemo, useCallback, useEffect } from "react";
import { useGetTasksQuery } from "entities/Task";

export type Filter = "all" | "completed" | "incomplete";

export function useTasks() {
  const { data: initialTasks = [] } = useGetTasksQuery();

  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  /* Добавил в TASK-1*/
  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;

    return tasks.filter((task) =>
      filter === "completed" ? task.completed : !task.completed,
    );
  }, [tasks, filter]);

  /* Добавил в TASK-1*/
  const removeTask = useCallback(
    (id: string) => setTasks((prev) => prev.filter((task) => task.id !== id)),
    [],
  );

  return { tasks: filteredTasks, filter, setFilter, removeTask };
}
