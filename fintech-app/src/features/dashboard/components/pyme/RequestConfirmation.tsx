import { useState } from "react";

export const RequestConfirmation: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Confirmación</h2>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700 leading-relaxed">
          Declaro haber leído y comprendido la información anterior, y acepto los términos y condiciones.
        </span>
      </label>

      <div className="text-center mt-6">
        <button
          // onClick={() => navigate("")} // Conectar con el formulario de solicitud
          disabled={!accepted}
          className={`px-6 py-3 rounded-lg text-lg font-medium transition ${
            accepted ? "bg-accent text-white hover:bg-accent/70" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continuar a la solicitud
        </button>
      </div>
    </div>
  )
}