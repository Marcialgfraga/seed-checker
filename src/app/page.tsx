import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="flex max-w-2xl flex-col items-center gap-8 px-6 py-20 text-center">
        {/* App title */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Seed Round Readiness Analyzer
        </h1>

        {/* Description */}
        <p className="max-w-lg text-lg text-muted-foreground">
          Answer 18 questions about your startup, upload your pitch deck, and
          get an AI-powered fundraising readiness score with actionable gap
          analysis.
        </p>

        {/* What you'll get */}
        <div className="grid w-full max-w-md gap-3 text-left text-sm text-muted-foreground">
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <span className="mt-0.5 text-lg">1.</span>
            <span>
              <strong className="text-foreground">Questionnaire</strong> — 5
              sections covering vision, wedge, expansion, traction, and team
            </span>
          </div>
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <span className="mt-0.5 text-lg">2.</span>
            <span>
              <strong className="text-foreground">Deck Upload</strong> — Upload
              your pitch deck (PDF or PPTX) for cross-referencing
            </span>
          </div>
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <span className="mt-0.5 text-lg">3.</span>
            <span>
              <strong className="text-foreground">Readiness Score</strong> —
              Get a 0-100 score across 4 dimensions with specific fixes
            </span>
          </div>
        </div>

        {/* CTA button */}
        <Link href="/questionnaire">
          <Button size="lg" className="text-lg px-8 py-6">
            Start Assessment
          </Button>
        </Link>

        {/* Footer note */}
        <p className="text-sm text-muted-foreground">
          Takes about 10 minutes. No sign-up required.
        </p>
      </main>
    </div>
  );
}
