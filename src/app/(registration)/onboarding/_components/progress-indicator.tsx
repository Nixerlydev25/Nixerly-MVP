interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels?: string[]
  hasStartedFilling?: boolean
}

export const ProgressIndicator = ({
  currentStep,
  totalSteps,
  stepLabels = [],
  hasStartedFilling = false,
}: ProgressIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          const isInProgress = isActive && hasStartedFilling

          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? isInProgress
                        ? "bg-nixerly-blue text-white ring-4 ring-nixerly-blue"
                        : "bg-nixerly-blue text-white"
                      : isCompleted
                        ? "bg-nixerly-blue text-white"
                        : "bg-gray-200 text-gray-600"
                  }
                `}
              >
                {stepNumber.toString().padStart(2, "0")}
              </div>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div className="relative h-0.5 w-14 sm:w-20 md:w-36 bg-gray-300 overflow-hidden">
                  <div
                    className={`
                      absolute top-0 left-0 h-full transition-all duration-500 ease-out
                      ${
                        stepNumber < currentStep
                          ? "w-full bg-nixerly-blue"
                          : isActive && hasStartedFilling
                            ? "w-full bg-nixerly-blue h-2"
                            : "w-0 bg-nixerly-blue"
                      }
                    `}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Step Labels */}
      {stepLabels.length > 0 && (
        <div className="flex items-center justify-between mt-2">
          {stepLabels.map((label, index) => (
            <div key={index} className="text-xs text-gray-600 text-center w-10">
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
