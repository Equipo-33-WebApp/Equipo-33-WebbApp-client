// fintech-app/src/features/dashboard/components/pyme/AMLValidation.tsx

import React, { useState } from "react";

interface AMLValidationProps {
  onNext: () => void;
  onBack: () => void;
}

export const AMLValidation: React.FC<AMLValidationProps> = ({
  onNext,
  onBack,
}) => {
  const [loading, setLoading] = useState(false);

  // Función que inicia la verificación AML en el servidor
  const handleValidationCheck = async () => {
    setLoading(true);

    // ********** LÓGICA DE CONEXIÓN REAL (COMENTADA) **********
    /*
        try {
            // Petición al servidor para ejecutar la validación AML (AJUSTA ESTA RUTA)
            const response = await fetch("/api/credit-request/run-aml-check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Aquí podrías enviar el ID de la solicitud guardada en el paso anterior
            });

            if (!response.ok) {
                throw new Error("Validación AML fallida o error de servidor.");
            }

            const result = await response.json();

            if (result.isCompliant) {
                onNext(); // Si el servidor confirma el cumplimiento, avanzamos.
            } else {
                alert(
                    "Su PYME no pasó la verificación AML/KYC. La solicitud no puede continuar."
                );
            }
        } catch (error) {
            console.error("Error en AML:", error);
            alert(
                "Ocurrió un error al verificar el cumplimiento. Intenta volver y avanzar."
            );
        } finally {
            setLoading(false);
        }
        */
    // ********** FIN LÓGICA DE CONEXIÓN REAL **********

    // ********** SIMULACIÓN DE CONEXIÓN CON ÉXITO (PARA DESARROLLO) **********
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Espera 1.5 segundos

    // Simula que la validación fue exitosa y avanza
    onNext();
    setLoading(false);
    // ********** FIN SIMULACIÓN **********
  };

  return (
    <div className="p-8 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-yellow-800 mb-4">
        Paso 2: Revisión de Cumplimiento (AML)
      </h2>
      <p className="text-gray-700 mb-6">
        Estamos verificando la información de su PYME con los requisitos de
        cumplimiento y prevención de lavado de activos.
      </p>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={loading}
          className="text-gray-600 hover:underline"
        >
          ← Volver
        </button>
        <button
          onClick={handleValidationCheck} // Llama a la función simulada
          disabled={loading}
          className={`px-6 py-2 rounded-lg transition ${
            loading
              ? "bg-gray-400 text-gray-600"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {loading ? "Verificando..." : "Iniciar Validación →"}
        </button>
      </div>
    </div>
  );
};
