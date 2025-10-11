import type { AuthResponse, LoginData, RegisterData, RegisterResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "https://e-commerce-api.academlo.tech/api/v1";

/* --- LOGIN --- */
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Credenciales inválidas");

    return await res.json();
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};


/* --- REGISTRO --- */
export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  try {
    
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(res)
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error de registro:", errorText);
      throw new Error("No se pudo registrar el usuario");
    }

    const responseData: RegisterResponse = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error al registrarse:", error);
    throw error;
  }
};