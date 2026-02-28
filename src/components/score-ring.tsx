"use client";

// ============================================================
// Circular score display.
// Shows the overall score (0-100) inside a colored ring.
// Color changes based on score range.
// ============================================================

interface ScoreRingProps {
  score: number; // 0-100
  label: string; // "Investor Ready", "Needs Work", etc.
}

// Map score ranges to colors
function getScoreColor(score: number): string {
  if (score >= 85) return "#22c55e"; // Green — Investor Ready
  if (score >= 70) return "#84cc16"; // Lime — Almost There
  if (score >= 50) return "#f59e0b"; // Amber — Needs Work
  if (score >= 30) return "#f97316"; // Orange — Early Stage
  return "#ef4444"; // Red — Too Early
}

export default function ScoreRing({ score, label }: ScoreRingProps) {
  const color = getScoreColor(score);

  // SVG circle math for the progress arc
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* The SVG ring */}
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160">
          {/* Background circle (gray track) */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-muted"
          />
          {/* Colored progress arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            // Rotate so the arc starts from the top
            transform="rotate(-90 80 80)"
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          />
        </svg>

        {/* Score number in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>
            {score}
          </span>
          <span className="text-sm text-muted-foreground">/ 100</span>
        </div>
      </div>

      {/* Label below the ring */}
      <span
        className="text-lg font-semibold px-3 py-1 rounded-full"
        style={{ color, backgroundColor: `${color}15` }}
      >
        {label}
      </span>
    </div>
  );
}
