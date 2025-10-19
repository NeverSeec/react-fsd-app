import { z } from "zod";

export const REGISTER_SCHEMA = z
  .object({
    username: z.string().min(1, "Имя пользователя обязательно"),
    email: z.string().email("Некорректный email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
    socialLinks: z.array(
      z.object({
        url: z.string().url("Некорректный URL").optional().or(z.literal("")),
      }),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
