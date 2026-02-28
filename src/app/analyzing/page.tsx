"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { loadAnswers, loadParsedDeck, saveResults } from "@/lib/storage";
import { AnalysisResult } from "@/lib/types";

// ============================================================
// Analyzing page — shows a loading animation with rotating
// status messages while the AI processes the startup data.
// Automatically redirects to /results when analysis is complete.
// ============================================================

// These messages rotate every 2 seconds to show "progress"
const STATUS_MESSAGES = [
  "Reviewing your questionnaire responses...",
  "Analyzing your narrative and vision...",
  "Evaluating traction and metrics...",
  "Assessing market sizing and timing...",
  "Reviewing team and execution readiness...",
  "Cross-referencing with your pitch deck...",
  "Scoring across 4 dimensions...",
  "Generating gap analysis and recommendations...",
  "Preparing your readiness report...",
];

export default function AnalyzingPage() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const hasStarted = useRef(false); // Prevent double-running in React strict mode

  // Rotate through status messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Run the analysis on mount
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    async function runAnalysis() {
      try {
        // Load the questionnaire answers and parsed deck from localStorage
        const questionnaire = loadAnswers() || {};
        const deck = loadParsedDeck();

        // Send to our analysis API
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionnaire,
            deckContent: deck?.rawText || null,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          setError(data.error || "Analysis failed. Please try again.");
          return;
        }

        // Save the results and redirect to the dashboard
        const results: AnalysisResult = await response.json();
        saveResults(results);
        router.push("/results");
      } catch {
        setError("Something went wrong. Please check your connection and try again.");
      }
    }

    runAnalysis();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        {error ? (
          // Error state
          <div className="space-y-4">
            <div className="text-4xl">!</div>
            <h2 className="text-xl font-semibold">Analysis Failed</h2>
            <p className="text-muted-foreground">{error}</p>
            <div className="flex gap-3 justify-center mt-4">
              <button
                onClick={() => {
                  setError(null);
                  hasStarted.current = false;
                  window.location.reload();
                }}
                className="text-sm font-medium underline hover:text-foreground text-muted-foreground"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/upload")}
                className="text-sm font-medium underline hover:text-foreground text-muted-foreground"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          // Loading state
          <div className="space-y-6">
            {/* Spinning animation */}
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
            </div>

            <h2 className="text-xl font-semibold">
              Analyzing Your Startup
            </h2>

            {/* Rotating status message */}
            <p className="text-muted-foreground min-h-[1.5rem] transition-opacity">
              {STATUS_MESSAGES[messageIndex]}
            </p>

            <p className="text-xs text-muted-foreground">
              This usually takes 5-15 seconds
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
