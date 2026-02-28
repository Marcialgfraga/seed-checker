import { NextRequest, NextResponse } from "next/server";
import { MOCK_ANALYSIS } from "@/lib/mock-analysis";
import { QUESTIONS } from "@/lib/questions";

// ============================================================
// POST /api/analyze
// Receives questionnaire answers + optional parsed deck content.
// Calls Claude API for real analysis, or returns mock data
// when no API key is configured (demo mode).
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const { questionnaire, deckContent } = await request.json();

    // Check if we have an API key — if not, return demo analysis
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      // Simulate processing delay so the loading screen feels real
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return NextResponse.json(MOCK_ANALYSIS);
    }

    // ---- Live mode: call Claude API ----
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey });

    const systemPrompt = buildSystemPrompt();
    const userMessage = buildUserMessage(questionnaire, deckContent);

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    // Extract the text response
    const responseText =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Parse JSON from Claude's response (it may be wrapped in code blocks)
    const jsonMatch =
      responseText.match(/```json\n?([\s\S]*?)\n?```/) ||
      responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("Could not parse JSON from Claude response:", responseText);
      return NextResponse.json({
        ...MOCK_ANALYSIS,
        mode: "live" as const,
      });
    }

    const analysisJson = JSON.parse(jsonMatch[1] || jsonMatch[0]);
    return NextResponse.json({ ...analysisJson, mode: "live" });
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}

// ============================================================
// Build the system prompt with the full scoring rubric.
// This is the most important piece — it tells Claude exactly
// how to evaluate the startup.
// ============================================================

function buildSystemPrompt(): string {
  return `You are an expert seed-stage startup analyst and former VC partner.
You evaluate startups on their readiness to raise a seed round.

SCORING RUBRIC (100 points total, 4 dimensions of 25 points each):

## Dimension 1: Narrative Clarity & Vision (25 points)
- Is the "why now" compelling and specific? (0-7)
- Is the vision ambitious but credible? (0-6)
- Is the problem framed around real pain with quantifiable cost? (0-6)
- Does the story flow logically from problem → solution → vision? (0-6)

## Dimension 2: Traction & Metrics (25 points)
- Are metrics present and clearly defined? (0-7)
- Is the growth rate strong for seed stage? (0-6)
- Are unit economics understood, even if early? (0-6)
- Is there evidence of product-market fit signals? (0-6)

## Dimension 3: Market & Timing (25 points)
- Is the market clearly defined and sized credibly? (0-7)
- Is the "why now" compelling — not just a nice-to-have? (0-6)
- Is the wedge strategy clear — do they know exactly where they start? (0-6)
- Is the expansion path logical and defensible? (0-6)

## Dimension 4: Team & Execution Readiness (25 points)
- Do the founders have relevant background for this problem? (0-7)
- Is the use of funds specific and capital-efficient? (0-6)
- Are the milestones realistic and well-defined? (0-6)
- Is there intellectual honesty about risks? (0-6)

SCORE LABELS:
- 85-100: "Investor Ready" — Strong across all dimensions
- 70-84: "Almost There" — Strong foundation with 1-2 areas to sharpen
- 50-69: "Needs Work" — Good elements but significant gaps
- 30-49: "Early Stage" — More building needed before fundraising
- 0-29: "Too Early" — Focus on product and traction first

INSTRUCTIONS:
1. Analyze the questionnaire answers and deck content (if provided) together
2. Cross-reference: flag any contradictions between questionnaire and deck
3. Be constructive but honest — founders need truth, not flattery
4. Give specific, actionable feedback — not generic advice
5. Write from the perspective of a friendly but rigorous seed investor
6. Each "whatsMissing" item should include a specific action the founder can take

OUTPUT FORMAT: Return ONLY valid JSON matching this exact structure (no markdown, no explanation, just the JSON):
{
  "overallScore": <number 0-100>,
  "label": "<one of the 5 labels above>",
  "dimensions": [
    {
      "name": "<dimension name>",
      "score": <number 0-25>,
      "maxScore": 25,
      "summary": "<1-2 sentences>",
      "whatsWorking": ["<strength 1>", "<strength 2>", "<strength 3>"],
      "whatsMissing": ["<gap 1 with specific action>", "<gap 2 with specific action>", "<gap 3 with specific action>"],
      "priorityFix": "<single most impactful thing to fix>",
      "investorLens": "<1-2 paragraphs from an investor's perspective>"
    }
  ],
  "narrative": "<2-3 paragraphs overall assessment with specific references to the startup's answers>",
  "topRecommendations": ["<action 1>", "<action 2>", "<action 3>"]
}`;
}

// ============================================================
// Build the user message with questionnaire answers and deck content.
// ============================================================

function buildUserMessage(
  questionnaire: Record<string, unknown>,
  deckContent: string | null
): string {
  let message = "## Startup Questionnaire Responses\n\n";

  // Format each answer with its question label for context
  for (const [key, value] of Object.entries(questionnaire)) {
    if (!value || (typeof value === "string" && !value.trim())) continue;

    // Find the question to include its label
    const question = QUESTIONS.find((q) => q.id === key);
    const label = question?.label || key;

    message += `**${label}**\n`;

    if (Array.isArray(value)) {
      // Founders array
      message += value
        .map(
          (f: { name?: string; role?: string; background?: string }) =>
            `- ${f.name || "?"} (${f.role || "?"}): ${f.background || "N/A"}`
        )
        .join("\n");
    } else {
      message += String(value);
    }
    message += "\n\n";
  }

  if (deckContent) {
    message += "\n## Pitch Deck Content (extracted text)\n\n";
    message += deckContent;
  } else {
    message +=
      "\n## Pitch Deck\nNo deck was uploaded. Evaluate based on questionnaire answers only.\n";
  }

  message +=
    "\n\nPlease analyze this startup's seed round readiness and return your assessment as JSON.";
  return message;
}
