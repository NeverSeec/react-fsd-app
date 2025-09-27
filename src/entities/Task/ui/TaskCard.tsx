import classnames from "classnames";
import type { Task } from "entities/Task";

import cn from "./TaskCard.module.css";

interface TaskCardProps extends Pick<Task, "title" | "completed"> {
  onRemove: () => void;
}

export function TaskCard({ title, completed, onRemove }: TaskCardProps) {
  const status = completed && "Завершенно";

  return (
    <div className={classnames(cn.container, completed && cn.completed)}>
      <span>{title}</span>
      <div className={cn.controls}>
        <span>{status}</span>
        <span className={cn.icon} onClick={onRemove}>
          X
        </span>
      </div>
    </div>
  );
}
