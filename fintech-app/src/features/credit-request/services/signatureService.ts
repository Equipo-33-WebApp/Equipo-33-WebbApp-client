import { API_URL } from "@/constants/api";

export const signCreditRequest = async (token: string, creditFormId: string, userId: string) => {
  const payloadToSign = JSON.stringify({
    creditId: creditFormId,
    userId,
    consent: true,
    timestamp: new Date().toISOString()
  });

  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(payloadToSign));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const documentHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  const res = await fetch(`${API_URL}/signature/verify`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      creditId: creditFormId,
      userId,
      documentHash
    })
  });

  if (!res.ok) throw new Error("Error al firmar la solicitud");

  return res.json();
}
