import { useState } from "react";
import { RequestInfo } from "../RequestInfo";
import { useRequestForms } from "../../hooks/useRequestForms";


export const RequestTerms: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const { nextStep } = useRequestForms();

  return (
    <>
      <RequestInfo />
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Confirmación</h2>

        <label className="flex gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="w-5 h-5 cursor-pointer text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm pb-1 text-gray-700 leading-relaxed">
            Declaro haber leído y comprendido la información anterior, y acepto los términos y condiciones.
          </span>
        </label>

        <div className="text-center mt-6">
          <button
            disabled={!accepted}
            onClick={nextStep}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition ${accepted ? "bg-accent text-white hover:bg-accent/70" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Continuar a la solicitud
          </button>
        </div>
      </div>
    </>
  )
}