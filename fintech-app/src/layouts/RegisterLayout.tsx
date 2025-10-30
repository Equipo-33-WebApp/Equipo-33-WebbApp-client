import { useEffect, useState } from "react"
import RegisterStep1 from "@/features/auth/components/RegisterStep1"
import RegisterStep2 from "@/features/auth/components/RegisterStep2"
import RegisterStep3 from "@/features/auth/components/RegisterStep3"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import RegisterEnd from "@/features/auth/components/RegisterEnd"
import { StepIndicator } from "@/components/ui/StepIndicator"
import { registerSteps } from "@/constants/steps"

export default function RegisterLayout() {
  const { isAuthenticated, hasPymeData, hasKyc } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      setStep(1);
    } else if (!hasPymeData) {
      setStep(2);
    } else if (!hasKyc) {
      setStep(3);
    } else {
      setStep(4);
    }
  }, [isAuthenticated, hasPymeData, hasKyc]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-900 via-gray-900 to-teal-900 px-4 py-10">
      <StepIndicator steps={registerSteps} step={step} />

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-lg transition-all duration-300">
        {step === 1 && (
          <RegisterStep1 />
        )}
        {step === 2 && (
          <RegisterStep2 onFinish={() => navigate(ROUTES.DASHBOARD.BASE)} />
        )}
        {step === 3 && (
          <RegisterStep3 onFinish={() => navigate(ROUTES.DASHBOARD.BASE)} />
        )}
        {step == 4 && (
          <RegisterEnd onFinish={() => navigate(ROUTES.DASHBOARD.BASE)} />
        )}
      </div>
    </div>
  )
}
