import { swornDeclarations } from "../../constants/requestData"
import { RequestCheckboxCard } from "../RequestCheckboxCard"
import { FundsSource } from "../static-forms/FundsSource"
import { ProcessStateCard } from "../ProcessStateCard"
import { RequestStepsBtns } from "../RequestStepsBtns"
import { RequestSupportCard } from "../RequestSupportCard"
import { useAuth } from "@/hooks/useAuth"
import { useRequestForms } from "../../hooks/useRequestForms"
import { CameraIcon, UploadIcon } from "@/components/icons"

export const RequestStep2: React.FC = () => {

  const { user } = useAuth();
  const { formData, updateForm } = useRequestForms();

  const beneficiarySection = "beneficiary";
  const kycDataSection = "kycData";

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Columna izquierda: principal */}
      <div className="lg:col-span-2 space-y-6">
        {/* Card informativa */}
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-2">Validación AML/KYC</h2>
          <p className="text-sm leading-relaxed">
            Las normativas AML/KYC nos obligan a conocer a nuestros clientes y verificar el origen de los fondos para
            prevenir el lavado de activos y el financiamiento del terrorismo. Esta información es confidencial y está
            protegida según las leyes de protección de datos.
          </p>
        </div>

        {/* Beneficiario final */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Beneficiario final</h3>
          <p className="text-sm text-gray-600">
            Persona natural que posee o controla más del 25% de la empresa.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Nombre</label>
              <input
                disabled
                placeholder="Nombre"
                value={user?.firstName}
                className="w-full rounded-lg p-3 bg-gray-50 text-gray-400 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Apellido</label>
              <input
                disabled
                placeholder="Apellido"
                value={user?.lastName}
                className="w-full rounded-lg p-3 bg-gray-50 text-gray-400 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>

            {/* DNI */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">DNI</label>
              <input
                name="dni"
                value={formData.beneficiary.dni}
                onChange={(e) => updateForm(beneficiarySection, "dni", e.target.value)}
                placeholder="Ej: 4444444"
                className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Verificación de identidad */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 sm:p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Verificación de identidad</h3>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-900">
            Sube fotos claras del documento de identidad del beneficiario final.<br />
            <strong>Formato:</strong> JPG, PNG. <strong>Tamaño máximo:</strong> 5MB por foto.
          </div>

          {/* Documento */}
          <div>
            <h4 className="font-medium text-gray-800">1. Documento de identidad</h4>
            <p className="text-sm text-gray-600 mb-3">
              Foto clara del DNI o documento de identidad del beneficiario final
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-2 border-dashed border-primary/40 rounded-xl p-4">
              <div className="flex flex-col gap-3 items-center sm:items-start">
                <label className="text-gray-700 font-medium text-sm">Foto del documento (frente)</label>
                <div className="flex-col">
                  <label
                    htmlFor="idDocumentFront"
                    className="px-4 py-2 mb-4 sm:mb-0 flex gap-2 bg-primary text-white text-sm font-medium rounded-lg shadow hover:bg-primary/80 cursor-pointer transition"
                  >
                    <UploadIcon /> Seleccionar archivo
                  </label>
                  <label
                    className="px-4 py-2 w-fit mx-auto flex gap-4 text-center sm:hidden bg-primary text-white text-sm font-medium rounded-lg shadow hover:bg-primary/80 cursor-pointer transition"
                  >
                    <CameraIcon /> Tomar Foto
                  </label>
                </div>
              </div>

              {formData.kycData.idDocumentFront ? (
                <div className="flex flex-col items-center">
                  <p className="text-gray-600 text-sm mb-1">Vista previa:</p>
                  <img
                    src={URL.createObjectURL(formData.kycData.idDocumentFront as Blob)}
                    alt="Foto documento cargada"
                    className="w-48 h-30 object-cover rounded-lg shadow border border-gray-200"
                  />
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">Ninguna imagen seleccionada</p>
              )}

              <input
                id="idDocumentFront"
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) =>
                  updateForm(kycDataSection, "idDocumentFront", e.target.files?.[0] ?? null)
                }
                className="hidden"
              />
            </div>
          </div>

          {/* Rostro */}
          <div>
            <h4 className="font-medium text-gray-800">2. Foto del rostro</h4>
            <p className="text-sm text-gray-600 mb-3">
              Foto del rostro del beneficiario final
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-2 border-dashed border-primary/40 rounded-xl p-4">
              <div className="flex flex-col gap-3 items-center sm:items-start">
                <label className="text-gray-700 font-medium text-sm">Selfie</label>
                <div className="flex-col">
                  <label
                    htmlFor="faceSelfie"
                    className="px-4 py-2 mb-4 sm:mb-0 flex gap-2 bg-primary text-white text-sm font-medium rounded-lg shadow hover:bg-primary/80 cursor-pointer transition"
                  >
                    <UploadIcon /> Seleccionar archivo
                  </label>
                  <label
                    className="px-4 py-2 w-fit mx-auto flex gap-4 text-center sm:hidden bg-primary text-white text-sm font-medium rounded-lg shadow hover:bg-primary/80 cursor-pointer transition"
                  >
                    <CameraIcon /> Tomar Foto
                  </label>
                </div>
              </div>

              {formData.kycData.faceSelfie ? (
                <div className="flex flex-col items-center">
                  <p className="text-gray-600 text-sm mb-1">Vista previa:</p>
                  <img
                    src={URL.createObjectURL(formData.kycData.faceSelfie as Blob)}
                    alt="Selfie cargada"
                    className="w-28 h-28 object-cover rounded-lg shadow border border-gray-200"
                  />
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">Ninguna imagen seleccionada</p>
              )}

              <input
                id="faceSelfie"
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) =>
                  updateForm(kycDataSection, "faceSelfie", e.target.files?.[0] ?? null)
                }
                className="hidden"
              />
            </div>
          </div>

        </div>

        <FundsSource />

        {/* Declaraciones juradas */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-5">
          <h3 className="text-lg font-semibold text-gray-800">Declaraciones juradas</h3>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-900">
            Debes aceptar todas las declaraciones para continuar.
          </div>

          {swornDeclarations.map((item, i) => (
            <RequestCheckboxCard key={i} index={i} title={item.title} desc={item.desc} value={item.value} />
          ))}
        </div>

        <RequestStepsBtns />
      </div>

      {/* Columna derecha */}
      <div className="space-y-6">
        <ProcessStateCard />

        <RequestSupportCard />
      </div>
    </section>
  )
}