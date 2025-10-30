import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { RequestTerms } from "@/features/credit-request/components/steps/RequestTerms";
import { RequestStep1 } from "@/features/credit-request/components/steps/RequestStep1";
import { RequestStep2 } from "@/features/credit-request/components/steps/RequestStep2";
import { RequestStep3 } from "@/features/credit-request/components/steps/RequestStep3";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { requestSteps } from "@/constants/steps";
import { useRequestForms } from "@/features/credit-request/hooks/useRequestForms";
import { ClipLoader } from "react-spinners";
import { UploadIcon } from "@/components/icons";


export const RequestLayout: React.FC = () => {
  const { isFullyRegistered } = useAuth();
  const { step, loading, saveDraft } = useRequestForms();

  if (!isFullyRegistered) return <Navigate to={ROUTES.DASHBOARD.BASE} replace />

  return (
    <>
      <section className="space-y-8 animate-fade-right">
        <header>
          <h1 className="text-2xl font-semibold text-gray-900">Solicitud de Crédito</h1>
        </header>

        {step !== 0 && step <= 3 && <StepIndicator steps={requestSteps} step={step} />}

        {step !== 0 && (
          <div className="flex justify-end w-full">
            <button 
              onClick={saveDraft}
              disabled={loading.active}
              className="bg-primary flex justify-center items-center gap-2 px-3 py-2 rounded-md text-white
              hover:bg-primary/90 transition-colors duration-500 text-md font-medium"
            >
              <UploadIcon /> Guardar borrador
            </button>
          </div>
        )}

        {step === 0 && <RequestTerms />}
        {step === 1 && <RequestStep1 />}
        {step === 2 && <RequestStep2 />}
        {step === 3 && <RequestStep3 />}


      </section>

      {/* Overlay de loading */}
      {loading.active && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
            <ClipLoader color="#00c853" size={30} aria-label="Loading Spinner" />
            <p className="text-gray-700 font-medium text-center">{loading.message}</p>
          </div>
        </div>
      )}
    </>
  );
};
