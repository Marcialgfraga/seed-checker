import {
  QuestionnaireAnswers,
  ParsedDeck,
  AnalysisResult,
} from "./types";

// ============================================================
// localStorage helpers.
// All keys are prefixed with "seedchecker_" to avoid conflicts
// with other apps on the same domain.
// ============================================================

const PREFIX = "seedchecker_";

// --- Generic helpers ---

function getItem<T>(key: string): T | null {
  // Guard: localStorage doesn't exist during server-side rendering
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function setItem(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // localStorage might be full — silently fail for now
  }
}

function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PREFIX + key);
}

// --- Questionnaire Answers ---

export function saveAnswers(answers: QuestionnaireAnswers): void {
  setItem("answers", answers);
}

export function loadAnswers(): QuestionnaireAnswers | null {
  return getItem<QuestionnaireAnswers>("answers");
}

// --- Current Step (which section the user is on) ---

export function saveCurrentStep(step: number): void {
  setItem("step", step);
}

export function loadCurrentStep(): number {
  return getItem<number>("step") ?? 0;
}

// --- Parsed Deck ---

export function saveParsedDeck(deck: ParsedDeck): void {
  setItem("deck", deck);
}

export function loadParsedDeck(): ParsedDeck | null {
  return getItem<ParsedDeck>("deck");
}

// --- Analysis Results ---

export function saveResults(results: AnalysisResult): void {
  setItem("results", results);
}

export function loadResults(): AnalysisResult | null {
  return getItem<AnalysisResult>("results");
}

// --- Clear everything (start over) ---

export function clearAll(): void {
  removeItem("answers");
  removeItem("step");
  removeItem("deck");
  removeItem("results");
}
