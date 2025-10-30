import { z } from "zod";

const allowedImgTypes = ["image/jpeg", "image/png"];
const maxImgSize = 5_000_000;

export const requestFormSchema = z.object({
  creditData: z.object({
    amount: z.number().positive("El monto debe ser mayor a 0"),
    termInMonths: z.number().positive("El plazo debe ser mayor a 0"),
    annualIncome: z.number().positive("El ingreso anual debe ser mayor a 0"),
    netIncome: z.number().positive("El ingreso neto debe ser mayor a 0"),
    creditDestination: z.string().min(1),
  }),
  documents: z.object({
    annualFinancials: z
      .instanceof(File, { error: "Carga un PDF de tus estados financieros anuales" })
      .refine((file) => file && file.type === "application/pdf", {
        error: "Solo se permiten archivos PDF",
      })
      .refine((file) => file.size <= 10_000_000, {
        error: "La imagen no puede superar los 10MB",
      }),
    taxReturn: z
      .instanceof(File, { error: "Carga un PDF de tu última declaración de impuestos" })
      .refine((file) => file && file.type === "application/pdf", {
        error: "Solo se permiten archivos PDF",
      })
      .refine((file) => file.size <= 10_000_000, {
        error: "La imagen no puede superar los 10MB",
      }),
  }),
  beneficiary: z.object({
    dni: z.string().min(7, "DNI inválido"),
  }),
  kycData: z.object({
    idDocumentFront: z
      .instanceof(File, { error: "Carga una imagen de tu DNI (frente)" })
      .refine((file) => allowedImgTypes.includes(file.type), {
        error: "Solo se permiten imágenes JPG o PNG",
      })
      .refine((file) => file.size <= maxImgSize, {
        error: "La imagen no puede superar los 5MB",
      }),
    faceSelfie: z
      .instanceof(File, { error: "Selfie no realizada" })
      .refine((file) => allowedImgTypes.includes(file.type), {
        error: "Solo se permiten imágenes JPG o PNG",
      })
      .refine((file) => file.size <= maxImgSize, {
        error: "La imagen no puede superar los 5MB",
      }),
  }),
  declarations: z.object({
    pep: z.literal(true, { message: "Debés aceptar PEP" }),
    fatca: z.literal(true, { message: "Debés aceptar FATCA" }),
    illicit: z.literal(true, { message: "Debés aceptar Ilícito" }),
    veracity: z.literal(true, { message: "Debés aceptar la declaración de veracidad" }),
    terms: z.literal(true, { message: "Debés aceptar los términos" }),
    signature: z.literal(true, { message: "Debés aceptar el consentimiento" }),
  })
});
