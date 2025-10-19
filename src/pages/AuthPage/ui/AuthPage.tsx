import { useActionState } from "react";
import { EMAIL_SCHEMA, PASSWORD_SCHEMA } from "../config/config.ts";
import cn from "./AuthPage.module.css";
import classNames from "classnames";

interface FormState {
  email: string;
  password: string;
  step: number;
  error: string | null;
  success: boolean;
}

const initialState: FormState = {
  email: "",
  password: "",
  step: 1,
  error: null,
  success: false,
};

async function submitForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    if (prevState.step === 1) {
      const email = formData.get("email") as string;

      EMAIL_SCHEMA.parse({ email });

      return {
        ...prevState,
        email,
        step: 2,
        error: null,
      };
    } else {
      const password = formData.get("password") as string;

      PASSWORD_SCHEMA.parse({ password });

      return {
        ...prevState,
        password,
        success: true,
        error: null,
      };
    }
  } catch (e: unknown) {
    return {
      ...prevState,
      error: "Произошла  ошибка",
      success: false,
    };
  }
}

export function AuthPage() {
  const [state, formAction, isPending] = useActionState(
    submitForm,
    initialState,
  );

  const handleBack = () => {
    window.location.reload();
  };

  return (
    <div className={cn.container}>
      <h2 className={cn.title}>
        {state.step === 1 ? "Введите email" : "Введите пароль"}
      </h2>

      <div className={cn.progress}>
        <div
          className={classNames(
            cn.step,
            state.step >= 1 && cn.stepActive,
            state.success && cn.stepCompleted,
          )}
        >
          1
        </div>
        <div
          className={classNames(
            cn.connector,
            state.step >= 2 && cn.connectorActive,
            state.success && cn.connectorCompleted,
          )}
        />
        <div
          className={classNames(
            cn.step,
            state.step >= 2 && cn.stepActive,
            state.success && cn.stepCompleted,
          )}
        >
          2
        </div>
      </div>

      {state.error && (
        <div className={classNames(cn.alert, cn.alertError)}>{state.error}</div>
      )}
      {state.success && (
        <div className={classNames(cn.alert, cn.alertSuccess)}>
          Авторизация успешно завершена!
        </div>
      )}

      {state.step === 1 && !state.success && (
        <form action={formAction} className={cn.form}>
          <div className={cn.field}>
            <label htmlFor="email" className={cn.label}>
              Email адрес *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              defaultValue={state.email}
              className={`${cn.input} ${state.error ? cn.inputError : ""}`}
              placeholder="your@email.com"
              required
            />
            <span className={cn.helpText}>
              Мы отправим вам код подтверждения
            </span>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`${cn.button} ${cn.buttonPrimary} ${cn.buttonFull}`}
          >
            {isPending ? "Проверка..." : "Продолжить"}
          </button>
        </form>
      )}

      {state.step === 2 && !state.success && (
        <form action={formAction} className={cn.form}>
          <input type="hidden" name="email" value={state.email} />

          <div className={cn.field}>
            <label htmlFor="password" className={cn.label}>
              Пароль *
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={`${cn.input} ${state.error ? cn.inputError : ""}`}
              placeholder="Введите ваш пароль"
              required
            />
            <span className={cn.helpText}>Минимум 6 символов</span>
          </div>

          <div className={cn.buttons}>
            <button
              type="button"
              onClick={handleBack}
              className={`${cn.button} ${cn.buttonSecondary}`}
            >
              Назад
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`${cn.button} ${cn.buttonSuccess}`}
            >
              {isPending ? "Отправка..." : "Завершить"}
            </button>
          </div>
        </form>
      )}

      {isPending && <div className={cn.loading}>Обработка...</div>}
    </div>
  );
}
