import { useEffect, useState } from "react";
import type { KycValidationData } from "../types";
import Cookies from "js-cookie";
import { uploadKyc } from "../services/kycService";
import { kycSchema } from "../schemas/kycSchema";
import z from "zod";
import { getPymeByAuthId } from "../services/pymeService";
import { useAuth } from "@/hooks/useAuth";

interface RegisterStep3Props {
  onFinish: () => void;
}

export default function RegisterStep3({ onFinish }: RegisterStep3Props) {
  const { updateUserPyme } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof KycValidationData, string>>>({});

  const [kycData, setKycData] = useState<KycValidationData>({
    nationalIdNumber: "",
    idDocumentFront: null,
    faceSelfie: null,
  });

  // Previews seguros: crear/revocar URLs cuando cambian los archivos
  const [previews, setPreviews] = useState<{ idDocumentFront?: string; faceSelfie?: string }>({});

  useEffect(() => {
    const urls: string[] = [];

    if (kycData.idDocumentFront) {
      const frontUrl = URL.createObjectURL(kycData.idDocumentFront);
      urls.push(frontUrl);
      setPreviews((p) => ({ ...p, idDocumentFront: frontUrl }));
    } else {
      setPreviews((p) => ({ ...p, idDocumentFront: undefined }));
    }

    if (kycData.faceSelfie) {
      const selfieUrl = URL.createObjectURL(kycData.faceSelfie);
      urls.push(selfieUrl);
      setPreviews((p) => ({ ...p, faceSelfie: selfieUrl }));
    } else {
      setPreviews((p) => ({ ...p, faceSelfie: undefined }));
    }

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [kycData.idDocumentFront, kycData.faceSelfie]);

  const handleChange = (field: keyof KycValidationData, value?: string | File | null) => {
    setKycData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const result = kycSchema.safeParse(kycData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const newFieldErrors: Partial<Record<keyof KycValidationData, string>> = {};

      (Object.keys(flattened.fieldErrors) as (keyof KycValidationData)[]).forEach((key) => {
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

      const res = await uploadKyc(kycData, token);
      const updatedPyme = await getPymeByAuthId(token);

      updateUserPyme(updatedPyme);

      if (!res.verified) setError(res.observation)
    } catch (err) {
      console.error(err);
      setError("Error al subir los documentos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-center text-white">Validación de identidad</h2>
      <p className="text-center text-gray-300 text-sm mb-4">
        Sube tus documentos para completar el registro.
      </p>

      <div>
        <label className="block text-sm text-gray-300 mb-2">Número de documento</label>
        <input
          type="text"
          value={kycData.nationalIdNumber || ""}
          onChange={(e) => handleChange("nationalIdNumber", e.target.value)}
          className="w-full rounded-xl p-3 bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          placeholder="12345678"
        />
        {fieldErrors.nationalIdNumber && (
          <p className="text-red-400 text-sm mt-1">{fieldErrors.nationalIdNumber}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div className="flex flex-col gap-3">
          <label className="flex flex-col text-sm text-gray-300">
            Foto del documento <span>(frente)</span>
          </label>
          <label
            htmlFor="idDocumentFront"
            className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg shadow hover:bg-gray-700 cursor-pointer transition"
          >
            Seleccionar archivo
          </label>
        </div>
        <div className="w-52 h-33 border-2 border-dashed border-primary rounded-sm">
          {previews.idDocumentFront && (
            <img
              src={previews.idDocumentFront}
              alt="Preview documento"
              className="w-52 h-32 object-cover rounded-lg border border-gray-500"
            />
          )}
        </div>

        <input
          id="idDocumentFront"
          type="file"
          accept="image/*"
          onChange={(e) => handleChange("idDocumentFront", e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </div>
      {fieldErrors.idDocumentFront && (
        <p className="text-red-400 text-sm mt-1">{fieldErrors.idDocumentFront}</p>
      )}

      {/* Selfie */}
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div className="flex flex-col gap-3">
          <label className="block text-sm text-gray-300">Selfie</label>
          <label
            htmlFor="faceSelfie"
            className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg shadow hover:bg-gray-700 cursor-pointer transition"
          >
            Seleccionar archivo
          </label>
        </div>

        <div className="w-33 h-33 border-2 border-dashed border-primary rounded-sm">
          {previews.faceSelfie && (
            <img
              src={previews.faceSelfie}
              alt="Preview selfie"
              className="w-33 h-32 object-cover rounded-lg border border-gray-500"
            />
          )}
        </div>
        <input
          id="faceSelfie"
          type="file"
          accept="image/*"
          onChange={(e) => handleChange("faceSelfie", e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </div>
      {fieldErrors.faceSelfie && (
        <p className="text-red-400 text-sm mt-1">{fieldErrors.faceSelfie}</p>
      )}

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
          {loading ? "Validando..." : "Validar"}
        </button>
      </div>
    </form>
  );
}