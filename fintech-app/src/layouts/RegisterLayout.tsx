import { useEffect, useState } from "react"
import RegisterStep1 from "@/features/auth/components/RegisterStep1"
import RegisterStep2 from "@/features/auth/components/RegisterStep2"
import RegisterStep3 from "@/features/auth/components/RegisterStep3"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import RegisterEnd from "@/features/auth/components/RegisterEnd"

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
      <div className="relative flex justify-between items-center w-full max-w-3xl mb-10">
        <div className="absolute top-5 left-8 w-[85%] sm:w-[90%] h-0.5 bg-gray-600 z-10"></div>

        {["Cuenta", "Empresa", "Validación"].map((label, i) => {
          const index = i + 1
          const stepDone = step > index
          const currentStep = step === index
          return (
            <div key={label} className="flex flex-col items-center text-white z-10">
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center font-bold border-2 transition-all 
                  ${stepDone || currentStep
                    ? "bg-accent border-accent scale-110 shadow-lg"
                    : "border-gray-600 text-gray-400 bg-gray-800"
                  }`}
              >
                <p className="relative flex justify-center items-center">
                  {stepDone ? "✓" : index}
                  <span
                    className={`
                      absolute w-7 h-7 rounded-full bg-accent 
                      ${currentStep ? "animate-ping" : "hidden"}
                      -z-10
                    `}
                  ></span>
                </p>

              </div>
              <p
                className={`mt-2 text-sm ${stepDone ? "text-white font-medium" : "text-gray-400"}`}
              >
                {label}
              </p>
            </div>
          )
        })}
      </div>

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
