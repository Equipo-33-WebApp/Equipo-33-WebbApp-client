import React, { useState } from "react";

interface DigitalSignatureProps {
  onFinish: () => void;
  onBack: () => void;
}

export const DigitalSignature: React.FC<DigitalSignatureProps> = ({
  onFinish,
  onBack,
}) => {
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Manejador para la subida de un archivo de firma
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSignatureFile(e.target.files[0]);
    }
  };

  // Función que simula el envío final de la firma y finaliza el proceso
  const handleFinalize = async () => {
    if (!signatureFile) {
      alert("Por favor, cargue su firma digital antes de continuar.");
      return;
    }
    setLoading(true);

    try {
      // Aquí se enviaría el archivo de la firma al servidor para adjuntarlo al contrato.
      // (Usarías FormData de nuevo si envías solo el archivo de firma).

      // SIMULACIÓN DE LA CONEXIÓN:
      console.log(`Enviando firma digital: ${signatureFile.name}`);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Si la API confirma que la firma se adjuntó con éxito:
      onFinish(); // Va a la pantalla de FINISHED
    } catch (error) {
      console.error("Error al firmar y finalizar:", error);
      alert("Ocurrió un error al procesar la firma digital.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-800 mb-4">
        Paso 3: Firma Digital del Contrato
      </h2>
      <p className="text-gray-700 mb-6">
        Revise el contrato de crédito y utilice su firma digital para formalizar
        la solicitud.
      </p>

      {/* ÁREA INTERACTIVA: Subida de archivo de firma */}
      <div className="border-2 border-dashed border-gray-400 p-6 mb-6 flex flex-col items-center justify-center text-gray-500">
        <p className="mb-2 text-sm">
          Cargar Archivo de Firma Digital (PNG, PDF, CER)
        </p>
        <input
          type="file"
          accept=".png,.pdf,.cer,.jpg"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
        {signatureFile && (
          <p className="mt-3 text-sm text-green-700 font-medium">
            Archivo cargado: {signatureFile.name}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={loading}
          className="text-gray-600 hover:underline"
        >
          ← Volver
        </button>
        <button
          onClick={handleFinalize}
          disabled={!signatureFile || loading}
          className={`px-8 py-3 rounded-lg font-semibold transition ${
            !signatureFile || loading
              ? "bg-gray-400 text-gray-600"
              : "bg-accent text-white hover:bg-accent/80"
          }`}
        >
          {loading ? "Firmando..." : "Firmar y Finalizar Solicitud"}
        </button>
      </div>
    </div>
  );
};
