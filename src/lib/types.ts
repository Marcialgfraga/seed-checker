// ============================================================
// Types for the Seed Round Readiness Analyzer
// Every other file imports from here.
// ============================================================

// --- Questionnaire Types ---

// One question in the form
export interface Question {
  id: string; // Unique key like "a1", "b3", "e2"
  section: "A" | "B" | "C" | "D" | "E"; // Which section it belongs to
  sectionTitle: string; // Display name: "The Vision", "The Wedge", etc.
  label: string; // The question text shown to the user
  helpText?: string; // Optional hint shown below the input
  type: "textarea" | "text" | "number" | "select" | "founders"; // What kind of input to show
  required: boolean; // Must the user fill this in before moving on?
  options?: string[]; // For "select" type — the dropdown choices
  placeholder?: string; // Placeholder text inside the input
  subFields?: SubField[]; // Extra numeric fields shown below the main input
}

// An extra numeric field attached to a question (e.g., MRR amount next to a textarea)
export interface SubField {
  id: string; // Unique key like "b4_mrr"
  label: string; // Display label: "Monthly Recurring Revenue ($)"
  type: "number" | "text";
  placeholder?: string;
}

// One founder entry for the team question
export interface Founder {
  name: string;
  role: string;
  background: string;
}

// All the user's answers, keyed by question id
// Values can be strings, numbers, arrays of Founder objects, etc.
export type QuestionnaireAnswers = Record<string, unknown>;

// --- Deck Parsing Types ---

// What comes back after parsing an uploaded deck
export interface ParsedDeck {
  fileName: string; // Original file name
  fileType: "pdf" | "pptx"; // Which format
  slideCount: number; // Number of slides or pages
  slides: ParsedSlide[]; // Text from each slide
  rawText: string; // All text combined into one string
}

// One slide/page from the parsed deck
export interface ParsedSlide {
  slideNumber: number;
  content: string; // Extracted text
}

// --- Analysis Types ---

// The full analysis result from Claude (or from mock/demo mode)
export interface AnalysisResult {
  overallScore: number; // 0-100
  label: string; // "Investor Ready", "Almost There", etc.
  dimensions: DimensionScore[]; // 4 dimensions, 25 points each
  narrative: string; // 2-3 paragraph overall assessment
  topRecommendations: string[]; // Top 3 action items
  mode: "demo" | "live"; // Whether this came from the mock or real AI
}

// One of the 4 scoring dimensions
export interface DimensionScore {
  name: string; // "Narrative Clarity & Vision", etc.
  score: number; // 0-25
  maxScore: number; // Always 25
  summary: string; // 1-2 sentence summary
  whatsWorking: string[]; // Bullet points of strengths
  whatsMissing: string[]; // Bullet points of gaps
  priorityFix: string; // Single most important action
  investorLens: string; // What an investor would think
}
