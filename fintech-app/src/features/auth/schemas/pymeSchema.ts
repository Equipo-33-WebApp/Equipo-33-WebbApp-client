import { z } from "zod";

export const pymeSchema = z.object({
  companyName: z
    .string()
    .min(2, "El nombre de la empresa debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(150, "La dirección es demasiado larga"),
  sector: z
    .string()
    .min(1, "Sector no elegido")
    .max(50, "El sector es demasiado largo"),
  employees: z
    .number({ error: "Debe ser un número" })
    .int("Debe ser un número entero")
    .min(0, "No puede ser menor a 0")
    .max(250, "Demasiados empleados"),
  phone: z
    .string()
    .min(6, "El teléfono es demasiado corto")
    .max(20, "El teléfono es demasiado largo"),
});

export type PymeSchema = z.infer<typeof pymeSchema>;
