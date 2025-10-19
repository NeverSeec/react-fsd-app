import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "shared/ui/FormField";
import { SocialLinksField } from "./SocialLinksField";
import { useNavigate } from "react-router-dom";
import type { RegisterFormData } from "../model/types.ts";
import { REGISTER_SCHEMA } from "pages/RegisterPage/config/config.ts";
import cn from "./RegisterPage.module.css";

export function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(REGISTER_SCHEMA),
    defaultValues: {
      socialLinks: [{ url: "" }],
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/tasks");
  };

  return (
    <div className={cn.container}>
      <h2 className={cn.title}>Регистрация пользователя</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={cn.form}>
        <FormField
          id="username"
          label="Имя пользователя"
          register={register}
          error={errors.username}
          required
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          register={register}
          error={errors.email}
          required
        />

        <FormField
          id="password"
          label="Пароль"
          type="password"
          register={register}
          error={errors.password}
          required
        />

        <FormField
          id="confirmPassword"
          label="Подтверждение пароля"
          type="password"
          register={register}
          error={errors.confirmPassword}
          required
        />

        <SocialLinksField
          control={control}
          register={register}
          errors={errors}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn.buttonSubmit}
        >
          {isSubmitting ? "Отправка..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
