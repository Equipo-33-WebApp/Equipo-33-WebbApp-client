import React from "react"

interface StepIndicatorProps {
  steps: string[]
  step: number
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, step }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-10">
      {steps.map((label, i) => {
        const index = i + 1
        const stepDone = step > index
        const currentStep = step === index
        const isLast = index === steps.length

        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center text-white">
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center font-bold border-2 transition-all 
              ${stepDone || currentStep
                    ? "bg-accent border-accent scale-110 shadow-lg"
                    : "border-gray-600 text-gray-400 bg-gray-800"
                  }`}
              >
                <p className="relative flex justify-center items-center">
                  {index}
                  <span
                    className={`absolute w-7 h-7 rounded-full bg-accent 
                  ${currentStep ? "animate-ping" : "hidden"} -z-10`}
                  ></span>
                </p>
              </div>

              <p className={`mt-2 text-center text-gray-400 text-sm ${stepDone ? "font-medium" : ""}`}>
                {label}
              </p>
            </div>

            {/* Línea entre steps */}
            {!isLast && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-6 transition-colors duration-300 
              ${step > index ? "bg-accent" : "bg-gray-600"}`}
              ></div>
            )}
          </React.Fragment>
        )
      })}
    </div>

  )
}