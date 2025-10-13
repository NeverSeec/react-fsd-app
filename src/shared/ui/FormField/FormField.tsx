import type {
  FieldValues,
  UseFormRegister,
  FieldError,
  Path,
} from "react-hook-form";

import cn from "./FormField.module.css";

interface FormFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  error?: FieldError;
  register: UseFormRegister<T>;
  required?: boolean;
}

export function FormField<T extends FieldValues>({
  id,
  label,
  type = "text",
  error,
  register,
  required = false,
}: FormFieldProps<T>) {
  return (
    <div className={cn.section}>
      <label htmlFor={id} className={cn.label}>
        {label} {required && "*"}
      </label>
      <input
        id={id}
        type={type}
        {...register(id)}
        className={`${cn.input} ${error ? cn.inputError : ""}`}
      />
      {error && <span className={cn.error}>{error.message}</span>}
    </div>
  );
}
