import React from "react";
import cn from "./Input.module.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export function Input({
  value,
  ref,
  onChange,
  type = "text",
  placeholder = "Введите текст",
  ...props
}: InputProps) {
  return (
    <input
      ref={ref}
      className={cn.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
}
