import classnames from "classnames";
import type { Task } from "entities/Task";

import cn from "./TaskCard.module.css";
import { memo } from "react";

interface TaskCardProps extends Pick<Task, "title" | "completed" | "id"> {
  onRemove: (id: string) => void;
}

function TaskCardInternal({ id, title, completed, onRemove }: TaskCardProps) {
  const status = completed && "Завершенно";

  const onClick = () => {
    onRemove(id);
  };

  return (
    <div className={classnames(cn.container, completed && cn.completed)}>
      <span>{title}</span>
      <div className={cn.controls}>
        <span>{status}</span>
        <span className={cn.icon} onClick={onClick}>
          X
        </span>
      </div>
    </div>
  );
}

export const TaskCard = memo(TaskCardInternal);
