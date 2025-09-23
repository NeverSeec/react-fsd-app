import { TaskCard } from "entities/Task/ui/TaskCard.tsx";
import cn from "./TaskList.module.css";
import useTasks from "widgets/TaskList/model/useTasks.ts";
import { TaskFilter } from "widgets/TaskList/ui/TaskFilter/TaskFilter.tsx";
import { MOCK_TASKS } from "entities/Task/__mock__/mockTasks.ts";

export function TaskList() {
  const { tasks, removeTask, filter, setFilter } = useTasks(MOCK_TASKS);

  return (
    <div className={cn.container}>
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

      {tasks.map(({ id, title, completed }) => {
        return (
          <TaskCard
            key={id}
            title={title}
            completed={completed}
            onRemove={() => removeTask(id)}
          />
        );
      })}
    </div>
  );
}
