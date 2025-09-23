import { FilterButton } from "shared/ui/FilterButton";
import type { Filter } from "../../model/useTasks";
import cn from "./TaskFilter.module.css";

interface TaskFilterProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "completed", label: "Выполненные" },
  { value: "incomplete", label: "Невыполненные" },
];

export const TaskFilter = ({
  currentFilter,
  onFilterChange,
}: TaskFilterProps) => {
  return (
    <div className={cn.filter}>
      {filters.map(({ value, label }) => (
        <FilterButton
          key={value}
          active={currentFilter === value}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </FilterButton>
      ))}
    </div>
  );
};
