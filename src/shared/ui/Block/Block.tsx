import cn from "./Block.module.css";

export interface BlockProps {
  children: React.ReactNode;
  title?: string;
}

export function Block({ title, children }: BlockProps) {
  return (
    <div className={cn.container}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}
