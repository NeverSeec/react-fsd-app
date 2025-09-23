import { TaskList } from "widgets/TaskList";
import cn from "./TaskPage.module.css";

export function TaskPage() {
  return (
    <div className={cn.container}>
      <h4>Мои задачи</h4>
      <TaskList />
    </div>
  );
}
