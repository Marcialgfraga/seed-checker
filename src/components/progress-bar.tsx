"use client";

import { SECTIONS } from "@/lib/questions";

// ============================================================
// Step indicator for the questionnaire.
// Shows 5 steps with the current one highlighted.
// ============================================================

interface ProgressBarProps {
  currentStep: number; // 0-indexed (0 = Section A, 4 = Section E)
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Step counter text */}
      <p className="text-sm text-muted-foreground mb-3">
        Step {currentStep + 1} of {SECTIONS.length}
      </p>

      {/* Step dots and labels */}
      <div className="flex items-center gap-1">
        {SECTIONS.map((section, index) => (
          <div key={section.key} className="flex items-center flex-1">
            {/* Step dot/bar */}
            <div
              className={`h-2 w-full rounded-full transition-colors ${
                index < currentStep
                  ? "bg-primary" // Completed steps = solid
                  : index === currentStep
                  ? "bg-primary" // Current step = solid
                  : "bg-muted" // Future steps = gray
              }`}
            />
          </div>
        ))}
      </div>

      {/* Section labels below the bars */}
      <div className="flex mt-2">
        {SECTIONS.map((section, index) => (
          <div key={section.key} className="flex-1 text-center">
            <span
              className={`text-xs ${
                index === currentStep
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {section.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
