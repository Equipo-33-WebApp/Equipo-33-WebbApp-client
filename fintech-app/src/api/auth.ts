export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

const API_URL = import.meta.env.VITE_API_URL || "https://e-commerce-api.academlo.tech/api/v1";

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
