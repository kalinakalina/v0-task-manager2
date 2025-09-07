"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: () => void
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [theme, setTheme] = useState("light")

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleThemeSelect = (selectedTheme: "light" | "dark") => {
    setTheme(selectedTheme)
    document.documentElement.classList.toggle("dark", selectedTheme === "dark")
  }

  const steps = [
    {
      content: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Welcome to Task Manager Pro</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-sm mx-auto">
            Let's get you set up with your workspace in less than a minute.
          </p>
          <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
            Get started
          </Button>
        </div>
      ),
    },
    {
      content: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Choose your theme</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">You can change this anytime in settings</p>
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={() => handleThemeSelect("light")}
              className={`relative w-32 h-20 rounded-lg border-2 transition-all ${
                theme === "light"
                  ? "border-primary shadow-md"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
              }`}
            >
              <div className="absolute inset-0 bg-white rounded-md m-1 flex items-center justify-center">
                <Sun className="w-6 h-6 text-gray-600" />
              </div>
              {theme === "light" && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
            <button
              onClick={() => handleThemeSelect("dark")}
              className={`relative w-32 h-20 rounded-lg border-2 transition-all ${
                theme === "dark"
                  ? "border-primary shadow-md"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
              }`}
            >
              <div className="absolute inset-0 bg-gray-900 rounded-md m-1 flex items-center justify-center">
                <Moon className="w-6 h-6 text-gray-300" />
              </div>
              {theme === "dark" && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          </div>
          <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
            Continue
          </Button>
        </div>
      ),
    },
    {
      content: (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Create your first task</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Try adding a task to get started with Task Manager Pro
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 max-w-sm mx-auto">
            <div className="text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick tip:</p>
              <p className="text-sm text-gray-900 dark:text-white">
                Click the "New Project" button to get started with your first project
              </p>
            </div>
          </div>
          <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
            I'll do it later
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            disabled={index > currentStep}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentStep
                ? "bg-gray-900 dark:bg-white w-6"
                : index < currentStep
                  ? "bg-gray-400 dark:bg-gray-500"
                  : "bg-gray-300 dark:bg-gray-700"
            } ${index <= currentStep ? "cursor-pointer" : "cursor-not-allowed"}`}
          />
        ))}
      </div>
      <div className="relative w-full max-w-md">
        <div className="relative h-[400px] overflow-hidden">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-300 ease-out ${
                index === currentStep ? "translate-x-0" : index < currentStep ? "-translate-x-full" : "translate-x-full"
              }`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 h-full flex items-center">
                {step.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
