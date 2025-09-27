import cn from "./FilterButton.module.css";

interface FilterButtonProps {
  children: string;
  active?: boolean;
  onClick: () => void;
}

export const FilterButton = ({
  children,
  active = false,
  onClick,
}: FilterButtonProps) => {
  return (
    <button
      className={`${cn.button} ${active ? cn.active : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
