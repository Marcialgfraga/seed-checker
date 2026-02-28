"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ScoreRing from "@/components/score-ring";
import DimensionCard from "@/components/dimension-card";
import { AnalysisResult } from "@/lib/types";
import { loadResults, clearAll } from "@/lib/storage";

// ============================================================
// Results dashboard — shows the overall score, dimension
// breakdowns, gap analysis, and recommendations.
// ============================================================

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load results from localStorage on mount
  useEffect(() => {
    const saved = loadResults();
    setResults(saved);
    setLoaded(true);
  }, []);

  // Show loading state
  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    );
  }

  // No results found — redirect to start
  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">No Analysis Found</h2>
          <p className="text-muted-foreground">
            Complete the questionnaire first to get your readiness score.
          </p>
          <Button onClick={() => router.push("/")}>Start Assessment</Button>
        </div>
      </div>
    );
  }

  // Handle starting over
  const handleStartOver = () => {
    clearAll();
    router.push("/");
  };

  // Handle retaking (keeps localStorage data, goes back to questionnaire)
  const handleRetake = () => {
    router.push("/questionnaire");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <a
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Seed Round Readiness Analyzer
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 space-y-10">
        {/* Demo mode banner */}
        {results.mode === "demo" && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertDescription className="text-amber-800">
              <strong>Demo Mode</strong> — This is sample analysis to show you
              what a real assessment looks like. To get AI-powered analysis of
              YOUR responses, add a Claude API key to your{" "}
              <code className="bg-amber-100 px-1 rounded text-xs">.env.local</code>{" "}
              file and restart the server.
            </AlertDescription>
          </Alert>
        )}

        {/* Overall Score */}
        <section className="text-center space-y-6">
          <h1 className="text-3xl font-bold">Your Readiness Score</h1>
          <ScoreRing score={results.overallScore} label={results.label} />
        </section>

        {/* Top 3 Recommendations */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Top Recommendations</h2>
          <ol className="space-y-2">
            {results.topRecommendations.map((rec, i) => (
              <li
                key={i}
                className="flex gap-3 items-start rounded-lg border p-3"
              >
                <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {i + 1}
                </span>
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Dimension Scores */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Dimension Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.dimensions.map((dim) => (
              <DimensionCard key={dim.name} dimension={dim} />
            ))}
          </div>
        </section>

        {/* Narrative Assessment */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Overall Assessment</h2>
          <div className="rounded-lg border p-6">
            {results.narrative.split("\n").map((paragraph, i) => (
              <p key={i} className="text-sm text-muted-foreground mb-3 last:mb-0 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Action buttons */}
        <section className="flex flex-col sm:flex-row gap-3 pb-12">
          <Button variant="outline" onClick={handleRetake}>
            Retake Assessment
          </Button>
          <Button variant="outline" onClick={handleStartOver}>
            Start Over
          </Button>
        </section>
      </main>
    </div>
  );
}
