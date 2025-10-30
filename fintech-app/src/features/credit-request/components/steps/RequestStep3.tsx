import { CheckCircledIcon, CircleIcon, DotFilledIcon } from "@/components/icons"
import { RequestStepsBtns } from "../RequestStepsBtns"
import { RequestSupportCard } from "../RequestSupportCard"
import { RequirementsInfoCard } from "../RequirementsInfoCard"
import { signatureDeclarations, signatureInfo } from "../../constants/requestData"
import { RequestCheckboxCard } from "../RequestCheckboxCard"
import { useRequestForms } from "../../hooks/useRequestForms"
import { useAuth } from "@/hooks/useAuth"
import { parseRequestErrorKey } from "@/utils/parseErrorKey"

export const RequestStep3: React.FC = () => {

  const { user } = useAuth();
  const { formData, handleSubmit, validationErrors, error } = useRequestForms();

  const creditInfoCardsData = [
    { label: "Monto solicitado", value: `$ ${formData.creditData.amount}` },
    { label: "Plazo", value: formData.creditData.termInMonths + " meses" },
    { label: "Ingreso anual", value: `$ ${formData.creditData.annualIncome}` },
    { label: "Ingreso anual neto", value: `$ ${formData.creditData.netIncome}` },
    { label: "Destino del Crédito", value: formData.creditData.creditDestination },
  ]

  const renderIcon = (complete: boolean) =>
    complete ? (
      <CheckCircledIcon classname="w-5 h-5 text-accent" />
    ) : (
      <CircleIcon classname="w-5 h-5 text-primary" />
    )

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Columna izquierda: principal */}
      <div className="lg:col-span-2 space-y-6">
        {/* Resumen de solicitud */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Resumen de tu solicitud</h3>

          {/* Datos principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {creditInfoCardsData.map((item, i) => (
              <div
                key={i}
                className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-900"
              >
                <p className="font-medium">{item.label}</p>
                <p className="text-gray-700">{item.value}</p>
              </div>
            ))}
          </div>

          <hr className="border-gray-200" />

          {/* Documentos adjuntos */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Documentos adjuntos:</h4>
            <ul className="space-y-2 text-sm text-gray-700 list-disc">
              <li className="flex items-center gap-2">
                <DotFilledIcon />
                Estados Financieros Anuales:
                <span>
                  {formData.documents.annualFinancials
                    ? formData.documents.annualFinancials.name
                    : "No cargado"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <DotFilledIcon />
                Declaración de Impuestos:
                <span>
                  {formData.documents.taxReturn
                    ? formData.documents.taxReturn.name
                    : "No cargado"}
                </span>
              </li>
            </ul>
          </div>

          <hr className="border-gray-200" />

          {/* Validaciones */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Validación AML/KYC</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <DotFilledIcon />
                Número de DNI:
                <span>
                  {formData.beneficiary.dni || "N/A"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <DotFilledIcon />
                Foto del DNI (frente):
                <span>
                  {formData.kycData.idDocumentFront
                    ? formData.kycData.idDocumentFront.name
                    : "No cargado"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <DotFilledIcon />
                Foto del Rostro:
                <span>
                  {formData.kycData.faceSelfie
                    ? formData.kycData.faceSelfie.name
                    : "No cargado"}
                </span>
              </li>

            </ul>
          </div>

          <hr className="border-gray-200" />

          {/* Declaraciones */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Declaraciones juradas</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                {renderIcon(formData.declarations.pep)}
                Persona expuesta políticamente (PEP)
              </li>
              <li className="flex items-center gap-2">
                {renderIcon(formData.declarations.fatca)}
                Cumplimiento FATCA/CRS

              </li>
              <li className="flex items-center gap-2">
                {renderIcon(formData.declarations.illicit)}
                Origen ilícito de fondos
              </li>
              <li className="flex items-center gap-2">
                {renderIcon(formData.declarations.veracity)}
                Veracidad de la información
              </li>
            </ul>
          </div>
        </div>

        {/* Firma digital */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Firma digital</h3>

          {/* Card informativa */}
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-4 text-sm">
            Revisa cuidadosamente el resumen de tu solicitud antes de firmar. Una vez firmada, no podrás realizar cambios.
          </div>

          {/* Firmante */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-1">Firmante</h4>
            <p className="text-sm text-blue-900 leading-relaxed">
              {user?.firstName} {user?.lastName} <br />
              DNI: {formData.beneficiary.dni || "N/A"} <br />
              Empresa - {user?.pymeData?.companyName}
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Checkboxes de confirmación */}
          {signatureDeclarations.map((item, i) => (
            <RequestCheckboxCard index={i} title={item.title} desc={item.desc} value={item.value} />
          ))}
        </div>

        {/* Mensajes de error */}
        {Object.keys(validationErrors).length > 0 || error && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">Errores</h3>
            <ul className="text-red-500 flex flex-col gap-4">
              <p>{error}</p>
              {Object.entries(validationErrors).map(([key, msg]) => (
                <li key={key}>
                  <pre className="whitespace-pre-line flex"><DotFilledIcon />
                    {parseRequestErrorKey(key)} {"\n"} 
                    {msg}
                  </pre>
                </li>
              ))}
            </ul>
          </div>
        )}


        <RequestStepsBtns onSubmit={handleSubmit} />
      </div>

      {/* Columna derecha */}
      <div className="space-y-6">
        <RequirementsInfoCard title="Información de firma" data={signatureInfo} />

        <RequestSupportCard />
      </div>
    </section>
  )
}