import { TaskCard } from "entities/Task";
import { TaskFilter } from "../TaskFilter/TaskFilter.tsx";
import { useTasks } from "../../model/useTasks.ts";

import cn from "./TaskList.module.css";

export function TaskList() {
  const { tasks, removeTask, filter, setFilter } = useTasks();

  return (
    <div className={cn.container}>
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

      {tasks.map(({ id, title, completed }) => {
        return (
          <TaskCard
            id={id}
            key={id}
            title={title}
            completed={completed}
            onRemove={removeTask}
          />
        );
      })}
    </div>
  );
}
