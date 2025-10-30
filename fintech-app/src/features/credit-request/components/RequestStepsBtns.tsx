import type { FormEvent } from "react";
import { useRequestForms } from "../hooks/useRequestForms"

interface RequestStepsBtns {
  onSubmit?: (e: FormEvent) => void
}

export const RequestStepsBtns: React.FC<RequestStepsBtns> = ({ onSubmit }) => {

  const { step, nextStep, prevStep, isAllCompleted } = useRequestForms();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={prevStep}
        className="px-6 py-3 flex-1 rounded-lg text-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
      >
        Anterior
      </button>


      {step === 3 ? (
        <button
          type="button"
          disabled={!isAllCompleted}
          onClick={onSubmit}
          className={`px-6 py-3 flex-1 rounded-lg text-lg font-medium hover:opacity-90 transition ${isAllCompleted ? "bg-accent text-white hover:bg-accent/70" : "bg-gray-300 text-gray-500 !cursor-not-allowed"}`}
        >
          Firmar
        </button>
      ) : (
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 flex-1 rounded-lg text-lg font-medium bg-accent text-white hover:opacity-90 transition"
        >
          Continuar
        </button>
      )}
    </div>
  )
}