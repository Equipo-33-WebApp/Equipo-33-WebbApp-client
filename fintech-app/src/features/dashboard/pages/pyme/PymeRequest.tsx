// fintech-app/src/features/dashboard/pages/PymeRequest.tsx

import React, { useState } from "react";

// --- Importaciones ---
import { DigitalSignature } from "@/features/credit-request/components/AMLValidation";
import { AMLValidation } from "@/features/credit-request/components/DigitalSignature";
import { FormCredit } from "@/features/credit-request/components/FormCredit";
import { RequestConfirmation } from "../../components/pyme/RequestConfirmation";
import { RequestInfo } from "../../components/pyme/RequestInfo";

// Definimos el orden de los pasos:
const STEP = {
  CONFIRMATION: 0,
  FORM: 1,
  AML: 2,
  SIGNATURE: 3,
  FINISHED: 4,
};

export const PymeRequest: React.FC = () => {
  // 🔑 Estado para controlar el paso actual del flujo
  const [step, setStep] = useState(STEP.CONFIRMATION);

  // Funciones de navegación
  const goNext = () => setStep(step + 1);
  const goBack = () => setStep(step - 1);
  const handleFinish = () => setStep(STEP.FINISHED);

  // --- RENDERIZADO DE LA PANTALLA FINAL ---
  if (step === STEP.FINISHED) {
    return (
      <div className="text-center py-20 bg-green-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-700">
          ¡Solicitud Enviada con Éxito!
        </h1>
        <p className="mt-4 text-gray-600">
          Revisaremos la documentación de su crédito y nos contactaremos pronto.
        </p>
      </div>
    );
  }

  // --- PREPARACIÓN DE HEADERS Y COMPONENTES ---
  let currentStepComponent;
  let headerTitle = "Solicitud de Crédito";
  // Usamos 'const' ya que este subtítulo no cambia
  const headerSubtitle =
    "Sigue los pasos para completar la solicitud de financiación para tu PYME.";

  switch (step) {
    case STEP.CONFIRMATION:
      headerTitle = "Solicitud de Crédito";
      currentStepComponent = <RequestConfirmation onContinue={goNext} />;
      break;

    case STEP.FORM:
      headerTitle = "Paso 1: Detalle del Crédito y Documentos";
      currentStepComponent = <FormCredit onNext={goNext} onBack={goBack} />;
      break;

    case STEP.AML:
      headerTitle = "Paso 2: Verificación de Cumplimiento (AML)";
      currentStepComponent = <AMLValidation onNext={goNext} onBack={goBack} />;
      break;

    case STEP.SIGNATURE:
      headerTitle = "Paso 3: Firma Digital del Contrato";
      currentStepComponent = (
        <DigitalSignature onFinish={handleFinish} onBack={goBack} />
      );
      break;

    default:
      currentStepComponent = <div>Error: Paso desconocido</div>;
  }

  return (
    <section className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">{headerTitle}</h1>
        <p className="text-gray-600 mt-1 text-sm">{headerSubtitle}</p>
        <div className="mt-4 text-sm font-medium text-blue-600">
          {/* Indicador de progreso */}
          Progreso: Paso {step} de {STEP.SIGNATURE}
        </div>
      </header>

      {/* Muestra RequestInfo solo en el primer paso */}
      {step === STEP.CONFIRMATION && <RequestInfo />}

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {currentStepComponent}
      </div>
    </section>
  );
};
