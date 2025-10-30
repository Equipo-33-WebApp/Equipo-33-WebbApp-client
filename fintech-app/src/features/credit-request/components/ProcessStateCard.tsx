import { CheckCircledIcon, CircleIcon } from "@/components/icons"
import { useRequestForms } from "../hooks/useRequestForms"

export const ProcessStateCard: React.FC = () => {

  const { 
    formData,
    setStep,
    isCreditDataComplete,
    isDocumentsComplete,
    isKycComplete,
    isDeclarationsComplete,
    isAllCompleted 
  } = useRequestForms();



  const renderIcon = (complete: boolean) =>
    complete ? (
      <CheckCircledIcon classname="w-5 h-5 text-accent" />
    ) : (
      <CircleIcon classname="w-5 h-5 text-primary" />
    )

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado del proceso</h3>
      <ul className="space-y-3 text-sm text-gray-700">
        {/* Datos del Crédito */}
        <li>
          <div className="flex items-center gap-2 font-medium text-gray-800">
            {renderIcon(isCreditDataComplete)} Datos del Crédito
          </div>
          <ul className="pl-6 mt-1 space-y-1 text-gray-600 list-disc">
            <li>Monto: ${formData.creditData.amount || "—"}</li>
            <li>Plazo: {formData.creditData.termInMonths + " meses" || "—"}</li>
            <li>Ingreso anual: ${formData.creditData.annualIncome || "—"}</li>
            <li>Ingreso neto anual: ${formData.creditData.netIncome || "—"}</li>
            <li>Destino: {formData.creditData.creditDestination || "—"}</li>
          </ul>
        </li>

        {/* Documentos */}
        <li>
          <div className="flex items-center gap-2 font-medium text-gray-800">
            {renderIcon(isDocumentsComplete)} Documentos
          </div>
          <ul className="pl-6 mt-1 space-y-1 text-gray-600 list-disc">
            <li>
              Estados financieros:{" "}
              {formData.documents.annualFinancials
                ? formData.documents.annualFinancials.name
                : "No cargado"}
            </li>
            <li>
              Declaración de impuestos:{" "}
              {formData.documents.taxReturn
                ? formData.documents.taxReturn.name
                : "No cargada"}
            </li>
          </ul>
        </li>

        {/* Validación AML/KYC */}
        <li>
          <div className="flex items-center gap-2 font-medium text-gray-800">
            {renderIcon(isKycComplete)} Validación AML/KYC
          </div>
          <ul className="pl-6 mt-1 space-y-1 text-gray-600 list-disc">
            <li>DNI Beneficiario: {formData.beneficiary.dni || "No ingresado"}</li>
            <li>
              Documento identidad:{" "}
              {formData.kycData.idDocumentFront
                ? formData.kycData.idDocumentFront.name
                : "No cargado"}
            </li>
            <li>
              Selfie:{" "}
              {formData.kycData.faceSelfie
                ? formData.kycData.faceSelfie.name
                : "No cargada"}
            </li>
          </ul>
        </li>

        {/* Declaraciones */}
        <li>
          <div className="flex items-center gap-2 font-medium text-gray-800">
            {renderIcon(isDeclarationsComplete)} Declaraciones
          </div>
          <ul className="pl-6 mt-1 space-y-1 text-gray-600 list-disc">
            <li>PEP: {formData.declarations.pep ? "Sí" : "No"}</li>
            <li>FATCA/CRS: {formData.declarations.fatca ? "Sí" : "No"}</li>
            <li>Origen lícito: {formData.declarations.illicit ? "Sí" : "No"}</li>
            <li>Veracidad: {formData.declarations.veracity ? "Sí" : "No"}</li>
          </ul>
        </li>
      </ul>

      <hr className="my-3 border-gray-200" />

      <ul className="space-y-2 text-sm text-gray-500">
        <li className="flex justify-between items-center">
          Términos:
          <span className={`font-medium
            ${formData.declarations.terms ? "text-accent" : "text-amber-500"}
            `}
          >
            {formData.declarations.terms ? "Aceptados" : "Pendiente"}
          </span>
        </li>
        <li className="flex justify-between items-center">
          Consentimiento:
          <span className={`font-medium
            ${formData.declarations.signature ? "text-accent" : "text-amber-500"}
            `}
          >
            {formData.declarations.signature ? "Otorgado" : "Pendiente"}
          </span>
        </li>
      </ul>

      {isAllCompleted && (
        <>
          <hr className="my-3 border-gray-200" />

          <button
            onClick={() => setStep(3)}
            className="px-3 py-1 w-full mt-2 animate-bounce rounded-lg text-lg font-medium transition bg-accent text-white hover:bg-accent/70"
          >
            Ir a Firma
          </button>
        </>
      )}
    </div>
  )
}