import React, { useActionState, useReducer } from "react";
import { formReducer, initialFormState } from "../model/reducer.ts";
import type { FormState } from "../lib/types";
import cn from "./ActionStateWithReducer.module.css";
import { Input } from "shared/ui/Input";

async function submitForm(
  data: FormState["values"],
): Promise<{ success: boolean; message?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Отправка данных:", data);

  if (Math.random() > 0.7) {
    return { success: false, message: "Ошибка сервера. Попробуйте снова." };
  }

  return { success: true, message: "Данные успешно отправлены!" };
}

export const ActionStateWithReducer: React.FC = () => {
  const [localState, localDispatch] = useReducer(formReducer, initialFormState);
  const [state, formAction, isLoading] = useActionState(
    async (previousState: FormState, formData: FormData) => {
      const values = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
      };

      let newState = formReducer(previousState, {
        type: "SET_STATUS",
        status: "submitting",
      });

      try {
        const result = await submitForm(values);

        if (result.success) {
          newState = formReducer(newState, {
            type: "SET_STATUS",
            status: "success",
          });
          // Сбрасываем форму при успешной отправке
          localDispatch({ type: "RESET_FORM" });
        } else {
          newState = formReducer(newState, {
            type: "SET_STATUS",
            status: "error",
          });
        }
      } catch (error) {
        newState = formReducer(newState, {
          type: "SET_STATUS",
          status: "error",
        });
      }

      return newState;
    },
    initialFormState,
  );

  const handleInputChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      localDispatch({
        type: "SET_FIELD",
        field,
        value: e.target.value,
      });
    };

  const getStatusText = () => {
    switch (state.status) {
      case "submitting":
        return "Отправка данных...";
      case "success":
        return "Данные успешно отправлены!";
      case "error":
        return "Произошла ошибка при отправке.";
      default:
        return "Заполните форму";
    }
  };

  return (
    <div className={cn.container}>
      <h2>Форма с useActionState и редюсером</h2>

      {localState.isDirty && (
        <div className={cn.dirtyIndicator}>
          Форма содержит несохраненные изменения
        </div>
      )}

      <form action={formAction} className={cn.form}>
        <div className={cn.field}>
          <label htmlFor="name">Имя</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={localState.values.name}
            onChange={handleInputChange("name")}
            disabled={state.status === "submitting"}
          />
        </div>

        <div className={cn.field}>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={localState.values.email}
            onChange={handleInputChange("email")}
            disabled={state.status === "submitting"}
          />
        </div>

        <div className={cn.field}>
          <label htmlFor="message">Сообщение</label>
          <textarea
            id="message"
            name="message"
            value={localState.values.message}
            onChange={handleInputChange("message")}
            disabled={state.status === "submitting"}
          />
        </div>

        <button
          type="submit"
          disabled={state.status === "submitting" || isLoading}
          className={cn.submitButton}
        >
          {state.status === "submitting" ? "Отправка..." : "Отправить"}
        </button>
      </form>

      <div className={cn.status}>{getStatusText()}</div>
    </div>
  );
};
