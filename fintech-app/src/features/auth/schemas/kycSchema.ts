import { z } from "zod";

const allowedImgTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImgSize = 5_000_000;

export const kycSchema = z.object({
  nationalIdNumber: z
    .string()
    .min(6, "El número debe tener al menos 6 caracteres")
    .max(20, "El número es demasiado largo")
    .nonempty("Ingrese número de documento"),
  idDocumentFront: z
    .instanceof(File, { error: "Selecciona una imagen del documento" })
    .refine((file) => allowedImgTypes.includes(file.type), {
      error: "Solo se permiten imágenes JPG, PNG o WEBP",
    })
    .refine((file) => file.size <= maxImgSize, {
      error: "La imagen no puede superar los 5MB",
    }),
  faceSelfie: z
    .instanceof(File, { error: "Selecciona una selfie" })
    .refine((file) => allowedImgTypes.includes(file.type), {
      error: "Solo se permiten imágenes JPG, PNG o WEBP",
    })
    .refine((file) => file.size <= maxImgSize, {
      error: "La imagen no puede superar los 5MB",
    }),
});

export type KycSchema = z.infer<typeof kycSchema>;