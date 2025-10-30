export function parseRequestErrorKey(key: string): string {
  switch (key) {
    case "creditData":
      return "Datos del Crédito";
    case "documents":
      return "Documentos";
    case "beneficiary":
      return "Beneficiario";
    case "kycData":
      return "Datos KYC";
    case "declarations":
      return "Declaraciones";
    default:
      return key;
  }
}
