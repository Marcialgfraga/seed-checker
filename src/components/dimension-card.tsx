"use client";

import { useState } from "react";
import { DimensionScore } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// ============================================================
// Card showing one scoring dimension.
// Displays score bar + summary, with expandable detail sections
// for strengths, gaps, priority fix, and investor perspective.
// ============================================================

interface DimensionCardProps {
  dimension: DimensionScore;
}

// Map dimension score (0-25) to color
function getDimensionColor(score: number, max: number): string {
  const pct = (score / max) * 100;
  if (pct >= 80) return "text-green-600";
  if (pct >= 60) return "text-lime-600";
  if (pct >= 40) return "text-amber-600";
  return "text-orange-600";
}

export default function DimensionCard({ dimension }: DimensionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const percentage = (dimension.score / dimension.maxScore) * 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        {/* Dimension name and score */}
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{dimension.name}</CardTitle>
          <span className={`text-lg font-bold ${getDimensionColor(dimension.score, dimension.maxScore)}`}>
            {dimension.score}/{dimension.maxScore}
          </span>
        </div>

        {/* Score bar */}
        <Progress value={percentage} className="h-2 mt-2" />
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Summary (always visible) */}
        <p className="text-sm text-muted-foreground">{dimension.summary}</p>

        {/* Toggle to show/hide details */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium text-primary hover:underline"
        >
          {isExpanded ? "Hide details" : "Show details"}
        </button>

        {/* Expandable detail sections */}
        {isExpanded && (
          <div className="space-y-5 pt-2">
            {/* What's Working */}
            <div>
              <h4 className="text-sm font-semibold text-green-700 mb-2">
                What&apos;s Working
              </h4>
              <ul className="space-y-1">
                {dimension.whatsWorking.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-green-600 shrink-0">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What's Missing */}
            <div>
              <h4 className="text-sm font-semibold text-amber-700 mb-2">
                What&apos;s Missing
              </h4>
              <ul className="space-y-1">
                {dimension.whatsMissing.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-amber-600 shrink-0">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Priority Fix */}
            <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
              <h4 className="text-sm font-semibold mb-1">
                Priority Fix
              </h4>
              <p className="text-sm text-muted-foreground">
                {dimension.priorityFix}
              </p>
            </div>

            {/* Investor Lens */}
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                Investor Perspective
              </h4>
              <p className="text-sm text-muted-foreground italic">
                {dimension.investorLens}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
