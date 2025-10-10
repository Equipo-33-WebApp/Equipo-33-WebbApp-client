import React, { useState } from "react";

// --- 1. ACTUALIZACIÓN DE INTERFACES ---

// Extendemos la interfaz para incluir un FileList o null para cada documento
interface DocumentFiles {
  financialStatements: FileList | null;
  taxReturns: FileList | null;
}

// Interfaz para los datos de texto/número
interface FormData {
  requestedAmount: number | "";
  monthlyIncome: number | "";
  loanTerm: string;
}

// Interfaz para las props del flujo
interface FormCreditProps {
  onNext: () => void;
  onBack: () => void;
}

export const FormCredit: React.FC<FormCreditProps> = ({ onNext, onBack }) => {
  // Estado para los datos de texto/número
  const [formData, setFormData] = useState<FormData>({
    requestedAmount: "",
    monthlyIncome: "",
    loanTerm: "12",
  });

  // 🔑 Nuevo Estado para los archivos PDF
  const [documentFiles, setDocumentFiles] = useState<DocumentFiles>({
    financialStatements: null,
    taxReturns: null,
  });

  const [loading, setLoading] = useState(false);

  // Manejador de cambios para los inputs de texto/selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // ... (Tu lógica existente para números y strings)
    const processedValue =
      name === "requestedAmount" || name === "monthlyIncome"
        ? value === ""
          ? ""
          : parseFloat(value)
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  };

  // 🔑 Nuevo Manejador para los inputs de tipo "file"
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    setDocumentFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files, // Guarda la lista de archivos (FileList)
    }));
  };

  // 🚀 Manejador para el envío / avance al siguiente paso
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ********* LÓGICA DE VALIDACIÓN DE DOCUMENTOS *********
    // Puedes añadir una validación simple para asegurar que hay archivos
    if (!documentFiles.financialStatements || !documentFiles.taxReturns) {
      alert(
        "Por favor, sube todos los documentos requeridos antes de continuar."
      );
      setLoading(false);
      return;
    }

    // 1. Aquí se enviaría la data (formData) y los archivos (documentFiles) a la API.
    console.log("Datos de Crédito:", formData);
    console.log("Archivos:", documentFiles);

    // SIMULACIÓN de Subida/Procesamiento
    setTimeout(() => {
      setLoading(false);

      // En lugar de alertar y resetear, avanzamos al paso AML
      onNext();
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-2">
        Paso 1: Detalle del Crédito y Documentos
      </h1>
      <p className="text-gray-500 mb-8">
        Por favor, ingresa los detalles del crédito y sube los documentos
        obligatorios en formato **PDF**.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* GRUPO DE DATOS (EXISTENTE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monto Solicitado */}
          <div>
            <label
              htmlFor="requestedAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Monto a Solicitar ($)
            </label>
            <input
              type="number"
              id="requestedAmount"
              name="requestedAmount"
              value={formData.requestedAmount}
              onChange={handleChange}
              required
              min="1000"
              placeholder="Mínimo $1,000"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Plazo del Préstamo */}
          <div>
            <label
              htmlFor="loanTerm"
              className="block text-sm font-medium text-gray-700"
            >
              Plazo (Meses)
            </label>
            <select
              id="loanTerm"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="12">12 Meses</option>
              <option value="24">24 Meses</option>
              <option value="36">36 Meses</option>
              <option value="48">48 Meses</option>
            </select>
          </div>
          {/* Ingreso Mensual */}
          <div>
            <label
              htmlFor="monthlyIncome"
              className="block text-sm font-medium text-gray-700"
            >
              Ingreso Mensual ($)
            </label>
            <input
              type="number"
              id="monthlyIncome"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              required
              min="0"
              placeholder="Ingreso total antes de impuestos"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* -------------------- GRUPO DE SUBIDA DE ARCHIVOS -------------------- */}
        <h2 className="text-xl font-semibold text-gray-800 pt-4 border-t">
          Documentación Requerida
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CAMPO: Estados Financieros */}
          <div>
            <label
              htmlFor="financialStatements"
              className="block text-sm font-medium text-gray-700"
            >
              Estados Financieros Anuales (PDF)
            </label>
            <input
              type="file"
              id="financialStatements"
              name="financialStatements"
              onChange={handleFileChange} // Usamos el nuevo manejador de archivos
              accept=".pdf" // Acepta solo archivos PDF
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              {documentFiles.financialStatements?.length
                ? `Archivo subido: ${documentFiles.financialStatements[0].name}`
                : "Máx. 5MB."}
            </p>
          </div>

          {/* CAMPO: Declaración de Impuestos */}
          <div>
            <label
              htmlFor="taxReturns"
              className="block text-sm font-medium text-gray-700"
            >
              Última Declaración de Impuestos (PDF)
            </label>
            <input
              type="file"
              id="taxReturns"
              name="taxReturns"
              onChange={handleFileChange}
              accept=".pdf"
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              {documentFiles.taxReturns?.length
                ? `Archivo subido: ${documentFiles.taxReturns[0].name}`
                : "Máx. 5MB."}
            </p>
          </div>
        </div>

        {/* BOTONES DE NAVEGACIÓN */}
        <div className="flex justify-between pt-6 border-t">
          {/* Botón de Volver */}
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Volver a la Confirmación
          </button>

          {/* Botón de Continuar */}
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 flex items-center gap-2 ${
              loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Procesando..." : "Continuar a Validación AML"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
