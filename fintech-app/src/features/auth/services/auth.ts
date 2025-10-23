import { getUserSubFromToken } from "@/utils/parseToken";
import type { AuthResponse, LoginData, UserRegisterData, RegisterResponse, UserUpdateData } from "../types";
import { API_URL } from "@/constants/api";



/* --- LOGIN --- */
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Credenciales inválidas");

    return res.json();
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const getUserByAuthId = async (token: string): Promise<User> => {
  const authId = getUserSubFromToken(token);
  if (!authId) throw new Error("No se encontró authId en el token");

  const userRes = await fetch(`${API_URL}/users/auth/${authId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!userRes.ok) {
    const errorText = await userRes.text();
    console.error("Error al obtener datos del usuario:", errorText);
    throw new Error("No se pudo obtener la información del usuario");
  }

  return await userRes.json();
}

export const updateUserByUserId = async (userId: string, token: string, data: UserUpdateData) => {
  const updateRes = await fetch(`${API_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
    }),
  });

  if (!updateRes.ok) {
    const errorText = await updateRes.text();
    console.error("Error al completar info de usuario:", errorText);
    throw new Error("No se pudieron guardar los datos personales");
  }
}


/* --- REGISTRO --- */
export const registerUser = async (data: UserRegisterData): Promise<RegisterResponse> => {
  try {
    const registerRes = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!registerRes.ok) {
      const errorText = await registerRes.text();
      console.error("Error al registrar en auth:", errorText);
      throw new Error("No se pudo registrar el usuario");
    }

    const createdUser: User = await registerRes.json();
    const userId = createdUser?.id;

    if (!userId) throw new Error("No se recibió ID del usuario tras el registro");

    return { userId };
  } catch (error) {
    console.error("Error en registerUser completo:", error);
    throw error;
  }
};