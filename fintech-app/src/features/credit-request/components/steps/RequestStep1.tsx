import { RequestStepsBtns } from "../RequestStepsBtns"
import { RequestSupportCard } from "../RequestSupportCard"
import { creditDestinations, documentRequirements, termInMonths } from "../../constants/requestData"
import { RequirementsInfoCard } from "../RequirementsInfoCard"
import { ProcessStateCard } from "../ProcessStateCard"
import { RequestUseDescription } from "../static-forms/RequestUseDescription"
import { useRequestForms } from "../../hooks/useRequestForms"
import { DotFilledIcon, UploadIcon } from "@/components/icons"


export const RequestStep1: React.FC = () => {

  const { formData, updateForm } = useRequestForms();

  const creditDataSection = "creditData";
  const docsSection = "documents";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ─────────── COLUMNA PRINCIPAL (Formulario) ─────────── */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Datos del crédito</h2>

          <form className="space-y-4">
            {/* Monto del crédito */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Monto del crédito</label>
              <input
                name="amount"
                value={formData.creditData.amount}
                onChange={(e) => updateForm(creditDataSection, "amount", Number(e.target.value))}
                type="number"
                min={0}
                placeholder="Ej: 500000"
                className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>

            {/* Plazo */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Plazo (meses)</label>
              <select
                name="termInMonths"
                value={formData.creditData.termInMonths}
                onChange={(e) => updateForm(creditDataSection, "termInMonths", Number(e.target.value))}
                className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              >
                <option value="" disabled>Seleccioná un plazo</option>
                {termInMonths.map((m) => (
                  <option key={m} value={m}>{m} meses</option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">Cuota mensual estimada: $0</p>
            </div>

            {/* Ingreso anual */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Ingreso anual</label>
              <input
                name="annualIncome"
                type="number"
                value={formData.creditData.annualIncome}
                onChange={(e) => updateForm(creditDataSection, "annualIncome", Number(e.target.value))}
                placeholder="Ej: 2000000"
                className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>

            {/* Ingreso anual neto */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Ingreso anual neto</label>
              <input
                name="netIncome"
                type="number"
                value={formData.creditData.netIncome}
                onChange={(e) => updateForm(creditDataSection, "netIncome", Number(e.target.value))}
                placeholder="Ej: 1500000"
                className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>

            {/* Destino del crédito */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Destino del crédito</label>
              <select
                name="creditDestination"
                value={formData.creditData.creditDestination}
                onChange={(e) => updateForm(creditDataSection, "creditDestination", e.target.value)}
                className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              >
                <option value="" disabled>Seleccioná un destino</option>
                {creditDestinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <RequestUseDescription />
          </form>
        </div>

        {/* ─────────── Documentación requerida ─────────── */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Documentación requerida</h3>

          <div>
            <h4 className="text-md font-medium text-gray-800">
              1. Estados financieros anuales
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Balance general y estado de resultados de los últimos 2 años
            </p>

            <div
              className="flex flex-col sm:flex-row justify-between items-center gap-6
              border-primary/30 border-2 border-dashed rounded-xl p-6 bg-white/70 shadow-sm"
            >
              <div className="flex flex-col justify-center items-center sm:items-start gap-3">
                <h4 className="text-gray-700 font-medium text-sm">
                  Estados financieros anuales
                </h4>
                <div>
                <label
                  htmlFor="annualFinancials"
                  className="px-4 py-2 flex gap-2 bg-primary text-white text-sm font-semibold rounded-lg shadow hover:bg-primary/80 cursor-pointer transition"
                >
                  <UploadIcon /> Seleccionar archivo
                </label>
                </div>
              </div>

              {formData.documents.annualFinancials ? (
                <div className="flex flex-col items-center sm:items-start text-sm">
                  <p className="flex items-center gap-1 text-gray-600">
                    <DotFilledIcon /> <span>Archivo cargado:</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const file = formData.documents.annualFinancials;
                      const pdfUrl = URL.createObjectURL(file as Blob);
                      window.open(pdfUrl, "_blank");
                    }}
                    className="text-blue-600 font-medium underline hover:text-blue-800 transition mt-1"
                  >
                    {formData.documents.annualFinancials.name}
                  </button>
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">
                  Ningún archivo seleccionado
                </p>
              )}

              <input
                id="annualFinancials"
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  updateForm(docsSection, "annualFinancials", e.target.files?.[0] ?? null)
                }
                className="hidden"
              />
            </div>

          </div>

          <div>
            <h4 className="text-md font-medium text-gray-800">
              2. Última declaración de impuestos
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Declaración anual del año fiscal más reciente
            </p>
            <div
              className="flex flex-col sm:flex-row justify-between items-center gap-6
              border-primary/30 border-2 border-dashed rounded-xl p-6 bg-white/70 shadow-sm"
            >
              <div className="flex flex-col justify-center items-center sm:items-start gap-3">
                <h4 className="text-gray-700 font-medium text-sm">
                  Última declaración de impuestos
                </h4>
                <label
                  htmlFor="taxReturn"
                  className="px-4 py-2 flex gap-2 bg-primary text-white text-sm font-semibold rounded-lg shadow hover:bg-primary/80 cursor-pointer transition"
                >
                  <UploadIcon /> Seleccionar archivo
                </label>
              </div>

              {formData.documents.taxReturn ? (
                <div className="flex flex-col items-center sm:items-start text-sm">
                  <p className="flex items-center gap-1 text-gray-600">
                    <DotFilledIcon /> <span>Archivo cargado:</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const file = formData.documents.taxReturn;
                      const pdfUrl = URL.createObjectURL(file as Blob);
                      window.open(pdfUrl, "_blank");
                    }}
                    className="text-blue-600 font-medium underline hover:text-blue-800 transition mt-1"
                  >
                    {formData.documents.taxReturn.name}
                  </button>
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">
                  Ningún archivo seleccionado
                </p>
              )}

              <input
                id="taxReturn"
                type="file"
                accept=".pdf"
                onChange={(e) => updateForm(docsSection, "taxReturn", e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <RequestStepsBtns />
      </div>

      {/* ─────────── COLUMNA SECUNDARIA ─────────── */}
      <div className="space-y-6">
        <ProcessStateCard />

        <RequestSupportCard />

        <RequirementsInfoCard title="Requisitos de Documentos" data={documentRequirements} />
      </div>
    </div>
  )
}