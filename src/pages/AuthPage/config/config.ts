import { z } from "zod";

export const EMAIL_SCHEMA = z.object({
  email: z
    .string()
    .min(1, "Email обязателен для заполнения")
    .email("Введите корректный email адрес"),
});

export const PASSWORD_SCHEMA = z.object({
  password: z
    .string()
    .min(1, "Пароль обязателен для заполнения")
    .min(6, "Пароль должен содержать минимум 6 символов"),
});

export const AUTH_SCHEMA = z.object({
  email: z
    .string()
    .min(1, "Email обязателен для заполнения")
    .email("Введите корректный email адрес"),
  password: z
    .string()
    .min(1, "Пароль обязателен для заполнения")
    .min(6, "Пароль должен содержать минимум 6 символов"),
});
