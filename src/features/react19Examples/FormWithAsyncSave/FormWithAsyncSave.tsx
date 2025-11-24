import { useActionState } from "react";
import cn from "./FormWithAsyncSave.module.css";
import { Input } from "shared/ui/Input";

export interface FormState {
  message: string;
  status: "idle" | "saving" | "success";
  value: string;
}

export type FormAction = (
  prevState: FormState,
  formData: FormData,
) => Promise<FormState>;

const initialState: FormState = {
  message: "",
  status: "idle",
  value: "",
};

const saveFormData: FormAction = async (_, formData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const inputValue = formData.get("inputField") as string;
  console.log("Сохраненное значение:", inputValue);

  return {
    ...initialState,
    message: "Данные успешно сохранены!",
    status: "success",
  };
};

export function FormWithAsyncSave() {
  const [state, formAction, isPending] = useActionState(
    saveFormData,
    initialState,
  );

  const getStateText = () => {
    if (isPending) return "Сохранение...";
    if (state.status === "success") return "Успешно сохранено";
    return "Готово";
  };

  const getButtonConfig = () => {
    if (isPending) {
      return "Сохранение";
    }

    if (state.status === "success") {
      return "Сохраненно";
    }

    return "Сохранить";
  };

  return (
    <div className={cn.container}>
      <h2>Форма с асинхронным сохранением</h2>

      <form action={formAction} className={cn.form}>
        <div className={cn.field}>
          <label htmlFor="inputField">Текст для сохранения</label>
          <Input
            type="text"
            id="inputField"
            name="inputField"
            defaultValue={state.value}
            disabled={isPending}
            placeholder="Введите текст..."
          />
        </div>

        <div className={cn.controls}>
          <button disabled={isPending} type="submit">
            {getButtonConfig()}
          </button>

          {state.message && <span>{state.message}</span>}
        </div>

        <div>Статус: {getStateText()}</div>
      </form>
    </div>
  );
}
