import { API_URL } from "@/constants/api";
import { getUserSubFromToken } from "@/utils/parseToken";
import type { PymeRegisterData } from "../types";

export const createPyme = async (data: PymeRegisterData, token: string): Promise<PymeUserData | null> => {
  const authId = getUserSubFromToken(token);
  if (!authId) throw new Error("No se encontró authId en el token");
  
  try {
    const res = await fetch(`${API_URL}/Pymes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        authId,
        ...data
      }),
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error al crear pyme:", errorText);
      throw new Error("No se pudo crear la pyme");
    }

    const newPyme = await res.json();
    if (!newPyme) {
      console.error("No se pudo obtener la nueva Pyme")
      return null
    }

    return normalizePyme(newPyme);
  } catch (error) {
    console.error("Error en createPyme completo:", error);
    throw error;
  }
};

export const getPymeByAuthId = async (token: string): Promise<PymeUserData | null> => {
  const authId = getUserSubFromToken(token);
  if (!authId) throw new Error("No se encontró authId en el token");

  const pymeRes = await fetch(`${API_URL}/Pymes/auth/${authId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (pymeRes.status === 404) return null;

  if (!pymeRes.ok) {
    const errorText = await pymeRes.text();
    console.error("Error al obtener datos de la pyme:", errorText);
    throw new Error("No se pudo obtener la información de la pyme");
  }

  const newPyme = await pymeRes.json();
  if (!newPyme) return null

  return normalizePyme(newPyme);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizePyme = (newPyme: any): PymeUserData => {
  return {
    companyName: newPyme.companyName,
    address: newPyme.address,
    sector: newPyme.sector,
    employees: newPyme.employees,
    phone: newPyme.phone,
    hasKycValidated: newPyme.hasKycValidated,
    pymeId: newPyme.id
  }
}