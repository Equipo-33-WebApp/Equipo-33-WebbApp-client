import { useState } from "react";
import type { PymeRegisterData } from "../types";
import { createPyme } from "../services/pymeService";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
import { pymeSchema } from "../schemas/pymeSchema";
import z from "zod";
import { ArrowDown } from "@/components/icons";

interface RegisterStep2Props {
  onFinish: () => void;
}

export default function RegisterStep2({ onFinish }: RegisterStep2Props) {
  const { updateUserPyme } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof PymeRegisterData, string>>>({});

  const [pymeData, setPymeData] = useState<PymeRegisterData>({
    companyName: "",
    address: "",
    sector: "",
    employees: 0,
    phone: "",
  })

  const handleChange = (field: keyof PymeRegisterData, value: string) => {
    setPymeData((prev) => ({
      ...prev,
      [field]: field === "employees" ? Number(value) : value,
    }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const result = pymeSchema.safeParse(pymeData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const newFieldErrors: Partial<Record<keyof PymeRegisterData, string>> = {};

      (Object.keys(flattened.fieldErrors) as (keyof PymeRegisterData)[]).forEach((key) => {
        const msgs = flattened.fieldErrors[key];
        if (msgs && msgs.length > 0) newFieldErrors[key] = msgs[0];
      });

      setFieldErrors(newFieldErrors);
      setLoading(false);
      return;
    }

    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No hay token disponible");

      const newPyme = await createPyme(pymeData, token);
      updateUserPyme(newPyme);

    } catch (err) {
      console.error(err);
      setError("Error al guardar la información de la empresa.");
    } finally {
      setLoading(false);
    }
  };

  const sectorValues = ["Industrial", "Comercial", "Servicios", "Agropecuario", "Construcción"];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-center text-white">
        Información de la empresa
      </h2>
      <p className="text-center text-gray-300 text-sm mb-4">
        Este paso es opcional, pero te permitirá acceder a más funciones.
      </p>

      {/* Nombre de empresa */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Nombre de empresa
        </label>
        <input
          name="companyName"
          value={pymeData.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          className="w-full rounded-xl p-3 bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          placeholder="Mi Empresa S.A."
          required
        />
        {fieldErrors.companyName && (
          <p className="text-red-400 text-sm mt-1">{fieldErrors.companyName}</p>
        )}
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Dirección</label>
        <input
          name="address"
          value={pymeData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="w-full rounded-xl p-3 bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          placeholder="Av. Principal 123, Ciudad"
          required
        />
        {fieldErrors.address && (
          <p className="text-red-400 text-sm mt-1">{fieldErrors.address}</p>
        )}
      </div>

      {/* Sector */}
      <div className="relative">
        <label className="block text-sm text-gray-300 mb-2">Sector</label>
        <select
          name="sector"
          value={pymeData.sector}
          onChange={(e) => handleChange("sector", e.target.value)}
          className="w-full rounded-xl p-3 bg-white/10 text-white border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none appearance-none"
        >
          <option value="" disabled>Selecciona un sector</option>
          {sectorValues.map(s => (
            <option key={s} value={s} className="text-black bg-white">{s}</option>
          ))}
        </select>
        <ArrowDown classname="absolute right-3 top-1/2 translate-y-1/5 pointer-events-none w-5 h-5 text-gray-400" />
        {fieldErrors.sector && (
          <p className="text-red-400 text-sm mt-1">{fieldErrors.sector}</p>
        )}
      </div>


      {/* Empleados */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Cantidad de empleados
        </label>
        <input
          name="employees"
          type="number"
          value={pymeData.employees}
          onChange={(e) => handleChange("employees", e.target.value)}
          min={0}
          max={250}
          className="w-full rounded-xl p-3 bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          placeholder="Ej. 15"
          required
        />
        {fieldErrors.employees && (
          <p className="text-red-400 text-sm mt-1">{fieldErrors.employees}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Teléfono</label>
        <input
          name="phone"
          value={pymeData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full rounded-xl p-3 bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          placeholder="+54 11 5555-5555"
          required
        />
        {fieldErrors.phone && (
          <p className="text-red-400 text-sm mt-1">{fieldErrors.phone}</p>
        )}
      </div>

      {error && <p className="text-red-400 text-center text-sm">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          type="button"
          onClick={onFinish}
          disabled={loading}
          className="flex-1 py-3 rounded-xl border border-gray-400 text-white hover:bg-white/10 transition-all duration-300"
        >
          Omitir este paso
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${loading
            ? "bg-[var(--color-primary)]/70 text-white cursor-not-allowed"
            : "bg-[var(--color-primary)] hover:bg-[#163a78] text-white hover:scale-[1.02]"
            }`}
        >
          {loading ? "Guardando..." : "Cargar Datos"}
        </button>
      </div>
    </form>
  );
}
