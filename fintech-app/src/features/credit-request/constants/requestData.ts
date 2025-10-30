import type { DeclarationItem, RequestDeclarations } from "../types";

// Step 1
export const termInMonths = [6, 12, 18, 24, 36];
export const creditDestinations = ["Capital de trabajo", "Maquinaria", "Infraestructura", "Vehículos"];
export const documentRequirements = [
  "Formato: PDF únicamente",
  "Tamaño máximo: 10MB por archivo",
  "Los documentos deben ser legibles",
  "Vigencia no mayor a 3 meses",
]

// Step 2
export const economicActivities = [
  "Comercio minorista",
  "Servicios profesionales",
  "Construcción",
  "Transporte y logística",
  "Gastronomía",
  "Turismo y hotelería",
  "Manufactura",
  "Tecnología y software",
  "Salud y bienestar",
  "Educación",
  "Agricultura y ganadería",
  "Importación y exportación",
]

export const countries = [
  "Argentina",
  "Chile",
  "Uruguay",
  "Paraguay",
  "Brasil",
  "Perú",
  "Bolivia",
  "Colombia",
  "México",
  "Ecuador",
  "Venezuela",
  "República Dominicana"
]

export const swornDeclarations: DeclarationItem<keyof Omit<RequestDeclarations, "terms" | "signature">>[] = [
  {
    title: "Persona expuesta políticamente (PEP)",
    desc: "Declaro que ni yo ni los beneficiarios finales de la empresa somos o hemos sido en los últimos 2 años funcionarios públicos o personas expuestas políticamente según la normativa vigente.",
    value: "pep"
  },
  {
    title: "Cumplimiento FATCA/CRS",
    desc: "Declaro que he proporcionado información veraz sobre mi residencia fiscal y cumplo con las normativas FATCA (Foreign Account Tax Compliance Act) y CRS (Common Reporting Standard).",
    value: "fatca"
  },
  {
    title: "Origen ilícito de fondos",
    desc: "Declaro que los fondos y recursos de mi empresa provienen de actividades lícitas y que no están relacionados con lavado de activos, financiamiento del terrorismo u otras actividades ilícitas.",
    value: "illicit"
  
  },
  {
    title: "Veracidad de la información",
    desc: "Declaro bajo juramento que toda la información proporcionada es verdadera, completa y exacta. Autorizo a la entidad financiera a verificar y validar dicha información.",
    value: "veracity"
  }
]

// Step 3

export const signatureDeclarations: DeclarationItem<"terms" | "signature">[] = [
  {
    title: "Acepto los términos y condiciones del contrato de crédito",
    desc: "Al firmar, acepto que esta firma digital tiene la misma validez legal que una firma manuscrita según la ley N°27269 - Ley de Firmas y Certificados Digitales.",
    value: "terms"
  },
  {
    title: "Confirmo que he revisado toda la información y deseo firmar esta solicitud",
    desc: "Declaro que la información proporcionada es correcta y autorizo a CrediPyme a procesar mi solicitud de crédito.",
    value: "signature"
  }
]

export const signatureInfo = [
  "La firma incluirá timestamp certificado",
  "Se generará un hash SHA-256 del documento",
  "Recibirás un comprobante de firma por email",
  "La firma queda registrada en blockchain para trazabilidad"
]
