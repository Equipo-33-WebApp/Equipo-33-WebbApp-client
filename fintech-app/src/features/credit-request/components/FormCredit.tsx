// fintech-app/src/features/dashboard/components/pyme/FormCredit.tsx

import React, { useState } from "react";

// --- Interfaces ---
interface DocumentFiles {
  financialStatements: FileList | null;
  taxReturns: FileList | null;
}
interface FormData {
  requestedAmount: number | "";
  monthlyIncome: number | "";
  loanTerm: string;
}
interface FormCreditProps {
  onNext: () => void;
  onBack: () => void;
}

export const FormCredit: React.FC<FormCreditProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    requestedAmount: "",
    monthlyIncome: "",
    loanTerm: "12",
  });
  const [documentFiles, setDocumentFiles] = useState<DocumentFiles>({
    financialStatements: null,
    taxReturns: null,
  });
  const [loading, setLoading] = useState(false);

  // Manejador de texto/selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const processedValue =
      name === "requestedAmount" || name === "monthlyIncome"
        ? value === ""
          ? ""
          : parseFloat(value)
        : value;
    setFormData((prevData) => ({ ...prevData, [name]: processedValue }));
  };

  // Manejador de archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setDocumentFiles((prevFiles) => ({ ...prevFiles, [name]: files }));
  };

  // Manejador de envío: SIMULACIÓN DE CONEXIÓN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentFiles.financialStatements || !documentFiles.taxReturns) {
      alert(
        "Por favor, sube todos los documentos requeridos antes de continuar."
      );
      return;
    }

    setLoading(true);

    // ************************************************************
    // *** CAMBIO CLAVE: SIMULACIÓN DE ENVÍO DE DATOS Y ESPERA ***
    // ************************************************************

    // En la fase de desarrollo, simulamos el éxito después de una breve espera.

    setTimeout(() => {
      setLoading(false);
      // Avanzamos al siguiente paso como si la conexión hubiera sido exitosa.
      onNext();
    }, 1500); // Espera 1.5 segundos para simular la latencia del servidor.

    // ************************************************************
    // *** CÓDIGO DE CONEXIÓN REAL AL SERVIDOR (COMENTADO) ***
    // ************************************************************
    /*
    const dataToSend = new FormData();

    // 1. Adjuntar datos de texto
    dataToSend.append("requestedAmount", String(formData.requestedAmount));
    dataToSend.append("loanTerm", formData.loanTerm);
    dataToSend.append("monthlyIncome", String(formData.monthlyIncome));

    // 2. Adjuntar archivos
    if (documentFiles.financialStatements) {
        dataToSend.append(
            "financialStatements",
            documentFiles.financialStatements[0]
        );
    }
    if (documentFiles.taxReturns) {
        dataToSend.append("taxReturns", documentFiles.taxReturns[0]);
    }

    try {
        // 3. Petición POST real al servidor (AJUSTA ESTA RUTA DE API)
        const response = await fetch("/api/credit-request/send-data-and-docs", {
            method: "POST",
            body: dataToSend,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || "Error en el servidor al subir archivos."
            );
        }

        // 4. Si es exitoso, avanzamos al siguiente paso
        onNext();
    } catch (error) {
        console.error("Fallo la solicitud:", error);
        alert("Ocurrió un error al enviar datos. Intenta de nuevo.");
    } finally {
        setLoading(false);
    }
    */
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* --- INPUTS DE DATOS --- */}
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
            <option value="12">12 Meses</option>{" "}
            <option value="24">24 Meses</option>{" "}
            <option value="36">36 Meses</option>{" "}
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

      {/* --- INPUTS DE ARCHIVOS PDF --- */}
      <h2 className="text-xl font-semibold text-gray-800 pt-4 border-t">
        Documentación Requerida
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estados Financieros */}
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
            onChange={handleFileChange}
            accept=".pdf"
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Declaración de Impuestos */}
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
        </div>
      </div>

      {/* BOTONES DE NAVEGACIÓN */}
      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 transition flex items-center gap-2"
        >
          ← Volver
        </button>
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
  );
};
