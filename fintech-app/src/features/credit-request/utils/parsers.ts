export const parseRiskLevel = (riskLevel: string) => {
  const parsed =
    riskLevel === "Alto" ?
      "High" : riskLevel === "Medio" ?
        "Medium" : riskLevel === "Bajo" ?
          "Low" : null;

  return parsed;
}