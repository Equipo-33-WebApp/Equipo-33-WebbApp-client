import { useState } from "react";
import { CheckCircledIcon } from "@/components/icons";

export const RequestOpDetails: React.FC = () => {
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setApproved(true);
    }, 2000);
  };

  const data = {
    companyData: {
      name: "Gastromy SRL",
      employees: 18,
      annualIncome: 48000000,
      netIncome: 9500000,
      mainActivity: "Gastronomía",
      countryOfOperations: "Argentina",
      riskLevel: "Medio"
    },
    beneficiary: {
      fullName: "Juan Pérez",
      dni: "99 999 999",
      email: "juan.perez@gmail.com",
      phone: "+54 11 2345-6789",
    },
    creditData: {
      amountRequested: 3500000,
      termMonths: 36,
      purpose: "Maquinaria",
    },
    documents: {
      annualFinancials: new File(["PDF CONTENT"], "estados-financieros-2025.pdf", { type: "application/pdf" }),
      taxReturn: new File(["PDF CONTENT"], "declaracion-impuestos-2025.pdf", { type: "application/pdf" }),
    },
  };

  return (
    <section className="space-y-8 animate-fade-right">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
          Solicitud de crédito
        </h2>
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm ${
            data.companyData.riskLevel === "Alto"
              ? "bg-red-100 text-red-700"
              : data.companyData.riskLevel === "Medio"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          Riesgo: {data.companyData.riskLevel}
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🧾 Datos de la empresa */}
        <div className="bg-gradient-to-br from-white via-white/90 to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
            Datos de la empresa
          </h3>
          <ul className="space-y-1.5 text-gray-700 text-sm">
            <li><b>Nombre:</b> {data.companyData.name}</li>
            <li><b>Empleados:</b> {data.companyData.employees}</li>
            <li><b>Ingresos anuales:</b> ${data.companyData.annualIncome.toLocaleString("es-AR")}</li>
            <li><b>Resultado neto anual:</b> ${data.companyData.netIncome.toLocaleString("es-AR")}</li>
            <li><b>Actividad principal:</b> {data.companyData.mainActivity}</li>
            <li><b>País de operaciones:</b> {data.companyData.countryOfOperations}</li>
          </ul>
        </div>

        {/* 👤 Beneficiario */}
        <div className="bg-gradient-to-br from-white via-white/90 to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Beneficiario final</h3>
          <ul className="space-y-1.5 text-gray-700 text-sm">
            <li><b>Nombre:</b> {data.beneficiary.fullName}</li>
            <li><b>DNI:</b> {data.beneficiary.dni}</li>
            <li><b>Email:</b> {data.beneficiary.email}</li>
            <li><b>Teléfono:</b> {data.beneficiary.phone}</li>
          </ul>
          <p className="flex gap-2 mt-10 font-semibold text-gray-800">
            <CheckCircledIcon classname="w-5 h-5 text-accent" /> Identidad verificada
          </p>
        </div>
      </div>

      {/* 💰 Datos del crédito */}
      <div className="bg-gradient-to-br from-white via-white/90 to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Datos del crédito</h3>
        <ul className="space-y-1.5 text-gray-700 text-sm">
          <li><b>Monto solicitado:</b> ${data.creditData.amountRequested.toLocaleString("es-AR")}</li>
          <li><b>Plazo:</b> {data.creditData.termMonths} meses</li>
          <li><b>Destino:</b> {data.creditData.purpose}</li>
        </ul>
      </div>

      {/* 📄 Documentación */}
      <div className="bg-gradient-to-br from-white via-white/90 to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Documentación</h3>
        <div className="space-y-2 flex flex-col items-start">
          <button
            onClick={() => window.open(URL.createObjectURL(data.documents.annualFinancials), "_blank")}
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Ver estados financieros
          </button>
          <button
            onClick={() => window.open(URL.createObjectURL(data.documents.taxReturn), "_blank")}
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Ver declaración de impuestos
          </button>
        </div>
      </div>

      {/* ✅ / ❌ Botones o mensaje de aprobación */}
      {!approved ? (
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleApprove}
            disabled={loading}
            className={`px-6 py-2.5 rounded-xl text-white font-medium shadow-sm transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Aprobando..." : "Aprobar solicitud"}
          </button>
          <button
            disabled={loading}
            className={`px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-sm transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            Rechazar solicitud
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-6 bg-green-50 border border-green-200 text-green-700 font-medium rounded-xl py-3 shadow-sm animate-fade-in">
          <CheckCircledIcon classname="w-5 h-5 mr-2 text-green-600" />
          Solicitud aprobada
        </div>
      )}
    </section>
  );
};
