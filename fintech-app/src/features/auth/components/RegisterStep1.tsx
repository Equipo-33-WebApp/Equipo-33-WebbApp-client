import { useState } from "react";
import { getUserByAuthId, loginUser, registerUser, updateUserByUserId } from "@/features/auth/services/auth";
import type { UserRegisterData } from "../types";
import { useAuth } from "@/hooks/useAuth";
import z from "zod";
import { userSchema } from "../schemas/userSchema";

export default function RegisterStep1() {
  const { login } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof UserRegisterData, string>>>({});

  const [userData, setUserData] = useState<UserRegisterData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const handleChange = (field: keyof UserRegisterData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const result = userSchema.safeParse(userData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const newFieldErrors: Partial<Record<keyof UserRegisterData, string>> = {};

      (Object.keys(flattened.fieldErrors) as (keyof UserRegisterData)[]).forEach((key) => {
        const msgs = flattened.fieldErrors[key];
        if (msgs && msgs.length > 0) newFieldErrors[key] = msgs[0];
      });

      setFieldErrors(newFieldErrors);
      setLoading(false);
      return;
    }

    if (userData.password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const { userId } = await registerUser(userData);

      const loginData = {
        email: userData.email,
        password: userData.password
      }

      const res = await loginUser(loginData);

      const updateUserData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
      }

      await updateUserByUserId(userId, res.token, updateUserData);

      if (res?.token) {
        const userData = await getUserByAuthId(res.token);
        login(res.token, userData, true);
      }

    } catch (err) {
      console.error("Error en el registro de Usuario:", err);
      setError("Error al registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-center text-white">Crear cuenta</h2>

      <div className="flex justify-between gap-2 items-center">
        {/* Nombre */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Nombre</label>
          <input
            name="firstName"
            value={userData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
            className="w-full rounded-xl p-3 bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            placeholder="Juan"
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Apellido</label>
          <input
            name="lastName"
            value={userData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
            className="w-full rounded-xl p-3 bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
            placeholder="Pérez"
          />
        </div>

      </div>
      {fieldErrors.firstName && (
        <p className="text-red-400 text-sm mt-1">{fieldErrors.firstName}</p>
      )}
      {fieldErrors.lastName && (
        <p className="text-red-400 text-sm mt-1">{fieldErrors.lastName}</p>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Correo electrónico</label>
        <input
          name="email"
          type="email"
          value={userData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          className="w-full rounded-xl p-3 bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          placeholder="empresa@correo.com"
        />
        {fieldErrors.email && (
          <p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>
        )}
      </div>

      {/* Contraseña */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Contraseña</label>
        <input
          name="password"
          type="password"
          value={userData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          className="w-full rounded-xl p-3 bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          placeholder="********"
        />
        {fieldErrors.password && (
          <p className="text-red-400 text-sm mt-1">{fieldErrors.password}</p>
        )}
      </div>

      {/* Confirmar contraseña */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">Confirmar contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full rounded-xl p-3 bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          placeholder="********"
        />
      </div>

      {error && <p className="text-red-400 text-center text-sm">{error}</p>}

      <button
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${loading
          ? "bg-[var(--color-primary)]/70 text-white cursor-not-allowed"
          : "bg-[var(--color-primary)] hover:bg-[#163a78] text-white hover:scale-[1.02]"
          }`}
      >
        {loading ? "Registrando..." : "Registrarme"}
      </button>
    </form>
  );
}
