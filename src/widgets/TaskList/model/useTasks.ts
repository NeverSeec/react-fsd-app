// widgets/taskList/model/useTasks.ts
import { useState, useMemo, useCallback } from "react";
import type { Task } from "entities/Task";

export type Filter = "all" | "completed" | "incomplete";

function useTasks(initial: Task[]) {
  const [tasks, setTasks] = useState(initial);
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;

    return tasks.filter((task) =>
      filter === "completed" ? task.completed : !task.completed,
    );
  }, [tasks, filter]);

  const removeTask = useCallback(
    (id: string) => setTasks((prev) => prev.filter((task) => task.id !== id)),
    [],
  );

  return { tasks: filteredTasks, filter, setFilter, removeTask };
}

export default useTasks;
