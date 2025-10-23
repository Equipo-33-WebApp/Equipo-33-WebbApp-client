import { z } from "zod";

export const userSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre es demasiado largo"),
    lastName: z
      .string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido es demasiado largo"),
    email: z
      .email("Ingresa un correo válido")
      .max(100, "El correo es demasiado largo"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(100, "La contraseña es demasiado larga"),
  });

export type UserSchema = z.infer<typeof userSchema>;
