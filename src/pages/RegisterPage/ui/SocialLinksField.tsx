import {
  type Control,
  type FieldErrors,
  useFieldArray,
  type UseFormRegister,
} from "react-hook-form";
import cn from "./RegisterPage.module.css";
import type { RegisterFormData } from "../model/types.ts";

interface SocialLinksFieldProps {
  control: Control<RegisterFormData>;
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
}

export function SocialLinksField({
  control,
  register,
  errors,
}: SocialLinksFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  return (
    <div className={cn.section}>
      <h3 className={cn.sectionTitle}>Социальные ссылки</h3>

      {fields.map((field, index) => (
        <div key={field.id} className={cn.dynamicField}>
          <div className={cn.dynamicFieldRow}>
            <div className={cn.dynamicFieldInput}>
              <input
                type="text"
                placeholder="https://example.com"
                {...register(`socialLinks.${index}.url`)}
                className={`${cn.input} ${
                  errors.socialLinks?.[index]?.url ? cn.inputError : ""
                }`}
              />
              {errors.socialLinks?.[index]?.url && (
                <span className={cn.error}>
                  {errors.socialLinks[index]?.url?.message}
                </span>
              )}
            </div>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className={cn.buttonDanger}
              >
                Удалить
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ url: "" })}
        className={cn.buttonSuccess}
      >
        Добавить ссылку
      </button>
    </div>
  );
}
