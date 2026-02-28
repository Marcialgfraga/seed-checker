"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progress-bar";
import QuestionSection from "@/components/question-section";
import { SECTIONS, getQuestionsForSection } from "@/lib/questions";
import { QuestionnaireAnswers, Founder } from "@/lib/types";
import {
  saveAnswers,
  loadAnswers,
  saveCurrentStep,
  loadCurrentStep,
} from "@/lib/storage";

// ============================================================
// Multi-step questionnaire page.
// Shows one section at a time (A through E).
// Auto-saves answers to localStorage so progress isn't lost.
// ============================================================

export default function QuestionnairePage() {
  const router = useRouter();

  // Current step (0 = Section A, 4 = Section E)
  const [currentStep, setCurrentStep] = useState(0);

  // All answers across all sections, keyed by question id
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});

  // Validation errors for the current section
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Whether we've loaded saved data from localStorage
  const [loaded, setLoaded] = useState(false);

  // Load saved progress when the page first loads
  useEffect(() => {
    const savedAnswers = loadAnswers();
    const savedStep = loadCurrentStep();
    if (savedAnswers) setAnswers(savedAnswers);
    if (savedStep) setCurrentStep(savedStep);
    setLoaded(true);
  }, []);

  // Auto-save answers whenever they change (after initial load)
  useEffect(() => {
    if (loaded) {
      saveAnswers(answers);
    }
  }, [answers, loaded]);

  // Auto-save step whenever it changes
  useEffect(() => {
    if (loaded) {
      saveCurrentStep(currentStep);
    }
  }, [currentStep, loaded]);

  // Handle a field value changing
  const handleChange = useCallback(
    (questionId: string, value: unknown) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      // Clear the error for this field when the user starts typing
      setErrors((prev) => {
        if (prev[questionId]) {
          const next = { ...prev };
          delete next[questionId];
          return next;
        }
        return prev;
      });
    },
    []
  );

  // Validate the current section before allowing "Next"
  const validateCurrentSection = (): boolean => {
    const section = SECTIONS[currentStep];
    const questions = getQuestionsForSection(section.key);
    const newErrors: Record<string, string> = {};

    for (const q of questions) {
      if (!q.required) continue;

      const value = answers[q.id];

      if (q.type === "founders") {
        // For founders, check that at least one founder has a name
        const founders = value as Founder[] | undefined;
        if (
          !founders ||
          founders.length === 0 ||
          !founders[0].name?.trim()
        ) {
          newErrors[q.id] = "Please add at least one founder with a name";
        }
      } else if (!value || (typeof value === "string" && !value.trim())) {
        newErrors[q.id] = "This field is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Go to the next step
  const handleNext = () => {
    if (!validateCurrentSection()) return;

    if (currentStep < SECTIONS.length - 1) {
      // Move to next section
      setCurrentStep(currentStep + 1);
      setErrors({});
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Last section — go to deck upload
      router.push("/upload");
    }
  };

  // Go to the previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Don't render anything until we've loaded saved data
  // (prevents a flash of empty form before localStorage loads)
  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Get the current section's info and questions
  const section = SECTIONS[currentStep];
  const questions = getQuestionsForSection(section.key);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Seed Round Readiness Analyzer
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-2xl px-6 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <ProgressBar currentStep={currentStep} />
        </div>

        {/* The current section's questions */}
        <QuestionSection
          sectionTitle={section.title}
          sectionSubtitle={section.subtitle}
          questions={questions}
          answers={answers}
          errors={errors}
          onChange={handleChange}
        />

        {/* Navigation buttons */}
        <div className="flex justify-between mt-10 pb-12">
          {/* Back button */}
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>

          {/* Next / Continue button */}
          <Button onClick={handleNext}>
            {currentStep === SECTIONS.length - 1
              ? "Continue to Deck Upload"
              : "Next"}
          </Button>
        </div>
      </main>
    </div>
  );
}
