// Nuevo componente para la firma del contrato
import React from "react";

interface DigitalSignatureProps {
  onFinish: () => void; // Finalizar la solicitud
  onBack: () => void;
}

export const DigitalSignature: React.FC<DigitalSignatureProps> = ({
  onFinish,
  onBack,
}) => {
  // Aquí se integraría la herramienta de firma digital (ej: DocuSign, o un componente para dibujar la firma)
  return (
    <div className="p-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-800 mb-4">
        Paso 3: Firma Digital del Contrato
      </h2>
      <p className="text-gray-700 mb-6">
        Revise el contrato de crédito y utilice su firma digital para formalizar
        la solicitud.
      </p>
      {/* Placeholder para el área de firma */}
      <div className="h-40 border-2 border-dashed border-gray-400 mb-6 flex items-center justify-center text-gray-500">
        [Área para cargar/dibujar Firma Digital]
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="text-gray-600 hover:underline">
          ← Volver
        </button>
        <button
          onClick={onFinish}
          className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/80 transition"
        >
          Firmar y Finalizar Solicitud
        </button>
      </div>
    </div>
  );
};
