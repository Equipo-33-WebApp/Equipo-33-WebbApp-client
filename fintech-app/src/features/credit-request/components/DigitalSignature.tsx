// Nuevo componente para la validación de cumplimiento
import React from "react";

interface AMLValidationProps {
  onNext: () => void;
  onBack: () => void;
}

export const AMLValidation: React.FC<AMLValidationProps> = ({
  onNext,
  onBack,
}) => {
  // Aquí iría la lógica para llamar a un servicio de validación de identidad/cumplimiento (KYC/AML)
  return (
    <div className="p-8 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-yellow-800 mb-4">
        Paso 2: Revisión de Cumplimiento (AML)
      </h2>
      <p className="text-gray-700 mb-6">
        Estamos verificando la información de su PYME con los requisitos de
        cumplimiento y prevención de lavado de activos. Esto puede tomar unos
        segundos.
      </p>
      {/* Simulación de la respuesta exitosa */}
      <div className="flex justify-between">
        <button onClick={onBack} className="text-gray-600 hover:underline">
          ← Volver
        </button>
        <button
          onClick={onNext}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Validación Exitosa, Continuar →
        </button>
      </div>
    </div>
  );
};
