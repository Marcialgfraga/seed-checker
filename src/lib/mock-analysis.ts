import { AnalysisResult } from "./types";

// ============================================================
// Realistic mock analysis for demo mode.
// This is what users see when no API key is configured.
// Designed to look like a real startup that "Needs Work" —
// not terrible, not great, with specific and actionable feedback.
// ============================================================

export const MOCK_ANALYSIS: AnalysisResult = {
  overallScore: 62,
  label: "Needs Work",
  mode: "demo",

  dimensions: [
    {
      name: "Narrative Clarity & Vision",
      score: 18,
      maxScore: 25,
      summary:
        "Your 'why now' is strong, but your problem framing is too abstract — investors will want to see specific customer pain quantified in dollars or time lost.",
      whatsWorking: [
        "Problem is specific and relatable — investors can immediately understand the pain point",
        "Solution approach is clearly differentiated from incumbents",
        "Long-term vision is ambitious but grounded in a real market need",
      ],
      whatsMissing: [
        "No clear explanation of why this problem is solvable NOW — the market timing insight is missing",
        "Problem framing lacks hard numbers — quantify the cost of the status quo in dollars or hours",
        "Missing a crisp one-sentence value proposition that a VC could repeat to their partners",
      ],
      priorityFix:
        "Add a 'Why Now' slide to your deck that identifies 2-3 specific market shifts (technological, behavioral, or regulatory) that make your solution possible today. This is the #1 thing VCs look for at seed stage.",
      investorLens:
        "An investor would see a founder who understands the problem deeply but hasn't yet articulated the market timing insight that separates great opportunities from good ideas. The vision is there, but the pitch needs a sharper hook — specifically, why this exact moment in time is the window of opportunity.",
    },
    {
      name: "Traction & Metrics",
      score: 16,
      maxScore: 25,
      summary:
        "Early traction is promising with decent growth trajectory, but key metrics (churn, CAC, LTV) are missing — this will be a concern for data-driven investors.",
      whatsWorking: [
        "Month-over-month growth rate is healthy for seed stage",
        "Have paying customers — not just free users or waitlist signups",
        "Early retention signals are encouraging based on the proof points shared",
      ],
      whatsMissing: [
        "Churn rate is not tracked — this is a red flag for any subscription business, even at seed stage",
        "No cohort analysis showing how your first monthly cohorts retain over time",
        "Customer acquisition cost (CAC) and lifetime value (LTV) are not calculated yet — even rough estimates help",
        "Growth rate should be shown as a chart with at least 3 months of data points, not just a single number",
      ],
      priorityFix:
        "Start tracking monthly churn immediately and build a simple cohort retention chart showing your first 3-6 monthly cohorts. This is the single most powerful proof point that separates 'growing' from 'growing sustainably.'",
      investorLens:
        "The growth numbers will get attention in a partner meeting, but a sophisticated seed investor will immediately ask about retention and unit economics. Not having churn data doesn't kill the deal, but it raises a yellow flag about analytical rigor. At minimum, know your numbers — even if they're early and imperfect.",
    },
    {
      name: "Market & Timing",
      score: 14,
      maxScore: 25,
      summary:
        "Market sizing is top-down and lacks bottom-up validation. The wedge strategy is clear, but the expansion path needs more concrete reasoning.",
      whatsWorking: [
        "TAM is large enough to be interesting for seed investors (venture-scale opportunity)",
        "Initial target customer segment is well-defined and reachable",
        "There is a clear wedge product that serves a specific, acute need",
      ],
      whatsMissing: [
        "Market sizing is purely top-down — need a bottom-up calculation: [# of target customers] x [ACV] = addressable market",
        "Expansion path from wedge to larger market is vague — how specifically do you go from segment A to segment B?",
        "No competitive landscape analysis — investors will want to know who else is attacking this space",
        "Defensibility/moat thesis is underdeveloped — what prevents a well-funded competitor from copying your approach?",
      ],
      priorityFix:
        "Build a bottom-up TAM calculation. Count the actual number of companies or people in your target segment, multiply by your annual contract value. This is 10x more credible than citing a Gartner report. Example: '47,000 DTC brands on Shopify doing $1-10M revenue x $1,200/year ACV = $56M initial addressable market.'",
      investorLens:
        "Investors will push back hard on a top-down-only TAM. The number itself matters less than the methodology — a smaller but well-reasoned bottom-up number is more convincing than a $50B top-down number pulled from an analyst report. The expansion story also needs work — show a logical sequence, not a wish list.",
    },
    {
      name: "Team & Execution Readiness",
      score: 14,
      maxScore: 25,
      summary:
        "Founding team has relevant experience, but the fundraise narrative needs significantly more specificity — vague use-of-funds is one of the most common seed-stage mistakes.",
      whatsWorking: [
        "Founders have domain expertise relevant to the problem they're solving",
        "Team is technical and can build the core product without outsourcing",
        "Prior startup or relevant industry experience adds credibility",
      ],
      whatsMissing: [
        "No clear 'founder-market fit' story — why is THIS team uniquely positioned to win?",
        "Use of funds breakdown is too vague — investors want specific allocations tied to outcomes",
        "12-18 month milestones are not tied to specific, measurable targets (revenue, customers, product milestones)",
        "Missing context on what happens if you DON'T hit your milestones — contingency thinking matters",
      ],
      priorityFix:
        "Rewrite your use-of-funds section with specific allocations and tie each one to a measurable milestone. Example: '40% engineering ($800K) — ship v2 with features X, Y, Z by Q3 2025. 30% go-to-market ($600K) — hire first AE, hit 100 paying customers by month 12. 20% ops ($400K) — 18 months of runway buffer.' This level of specificity signals capital efficiency and planning rigor.",
      investorLens:
        "At seed stage, investors bet on teams as much as products. The team slide needs to tell a story about WHY these specific founders will win this specific market. Generic bios aren't enough — each founder should have a 'why me' that connects their background to this exact problem. The use-of-funds vagueness is a bigger issue — it suggests the founders haven't thought critically about capital allocation, which is exactly what investors are evaluating.",
    },
  ],

  narrative:
    "Your startup shows the core ingredients of a compelling seed-stage company: a real problem that people are willing to pay to solve, early traction that suggests product-market fit is emerging, and a technical founding team that can build without heavy outside dependency.\n\nHowever, several gaps need to be addressed before approaching top-tier seed investors. The biggest concern is the disconnect between your growth story and your metrics infrastructure — you're growing, but you can't yet prove that growth is efficient or sustainable because key metrics (churn, CAC, LTV, cohort retention) aren't being tracked. Seed investors are increasingly data-savvy and will expect at least basic unit economics understanding, even if the numbers are early.\n\nThe second major gap is in your fundraise packaging. Your deck needs three things: (1) a sharper 'Why Now' thesis that identifies the specific market shift creating your window of opportunity, (2) a bottom-up market sizing that shows you deeply understand your customer segment, and (3) a use-of-funds breakdown with specific allocations tied to measurable milestones. These three additions alone would move your readiness score significantly.\n\nBottom line: you're 4-6 weeks of focused work away from being genuinely investor-ready. The traction is there — the packaging and metrics infrastructure need to catch up.",

  topRecommendations: [
    "Start tracking monthly churn rate and build a 3-month cohort retention chart — this is the most important missing proof point",
    "Build a bottom-up TAM calculation using real customer counts and your actual pricing — replace the top-down market sizing",
    "Rewrite your use-of-funds with specific dollar allocations tied to measurable 12-month milestones",
  ],
};
