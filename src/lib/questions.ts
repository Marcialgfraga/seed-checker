import { Question } from "./types";

// ============================================================
// All 18 questions across 5 sections.
// The questionnaire page renders these in order.
// ============================================================

export const SECTIONS = [
  { key: "A" as const, title: "The Vision", subtitle: "Why does this matter?" },
  { key: "B" as const, title: "The Wedge", subtitle: "How do you get in?" },
  {
    key: "C" as const,
    title: "The Expansion Path",
    subtitle: "Where does this go?",
  },
  {
    key: "D" as const,
    title: "Traction & Proof Points",
    subtitle: "What evidence do you have?",
  },
  { key: "E" as const, title: "Team & Ask", subtitle: "Who are you and what do you need?" },
];

export const QUESTIONS: Question[] = [
  // ---- Section A: The Vision (3 questions) ----
  {
    id: "a1",
    section: "A",
    sectionTitle: "The Vision",
    label:
      "In one sentence, what does the world look like if you succeed?",
    helpText: "Forces clarity of vision. Think big but be specific.",
    type: "textarea",
    required: true,
    placeholder: "e.g., Every small business has access to enterprise-grade financial tools...",
  },
  {
    id: "a2",
    section: "A",
    sectionTitle: "The Vision",
    label:
      "What fundamental shift (technological, behavioral, regulatory) makes this possible NOW that wasn't possible 3 years ago?",
    helpText: "This tests your 'why now' conviction — the market timing insight.",
    type: "textarea",
    required: true,
    placeholder: "e.g., The rise of open banking APIs means we can now...",
  },
  {
    id: "a3",
    section: "A",
    sectionTitle: "The Vision",
    label:
      "Who is suffering most from the current way things work, and what does that suffering cost them (in dollars, time, or opportunity)?",
    helpText:
      "Be specific about the pain. Quantify it if you can.",
    type: "textarea",
    required: true,
    placeholder:
      "e.g., Mid-market CFOs spend 20+ hours/month manually reconciling...",
  },

  // ---- Section B: The Wedge (4 questions) ----
  {
    id: "b1",
    section: "B",
    sectionTitle: "The Wedge",
    label:
      "What is the smallest, most specific version of your product that your first users can't live without?",
    helpText: "Your wedge is your entry point. It should be narrow and indispensable.",
    type: "textarea",
    required: true,
    placeholder:
      "e.g., A one-click invoice reconciliation tool for Shopify merchants...",
  },
  {
    id: "b2",
    section: "B",
    sectionTitle: "The Wedge",
    label:
      "Describe your ideal first 100 customers. Who are they specifically? (Job title, company size, industry, geography)",
    helpText: "The more specific, the better. 'SMBs' is too vague.",
    type: "textarea",
    required: true,
    placeholder:
      "e.g., E-commerce ops managers at DTC brands doing $1-10M revenue, based in the US...",
  },
  {
    id: "b3",
    section: "B",
    sectionTitle: "The Wedge",
    label:
      "Why do these customers choose YOU over doing nothing, building it themselves, or using an existing alternative?",
    helpText: "This tests differentiation AND urgency.",
    type: "textarea",
    required: true,
    placeholder:
      "e.g., Our tool saves 15 hours/month vs. their current spreadsheet workflow, and unlike Competitor X we...",
  },
  {
    id: "b4",
    section: "B",
    sectionTitle: "The Wedge",
    label:
      "What is your current pricing model? What does a customer pay, and what do they get?",
    helpText: "Include price point and what's included. It's fine to say 'still testing pricing'.",
    type: "textarea",
    required: false,
    placeholder:
      "e.g., $99/month per seat, includes unlimited reconciliations and Slack alerts...",
    subFields: [
      {
        id: "b4_price",
        label: "Price point ($/month)",
        type: "number",
        placeholder: "e.g., 99",
      },
      {
        id: "b4_contract",
        label: "Contract length (months)",
        type: "number",
        placeholder: "e.g., 12",
      },
    ],
  },

  // ---- Section C: The Expansion Path (3 questions) ----
  {
    id: "c1",
    section: "C",
    sectionTitle: "The Expansion Path",
    label:
      "Starting from your wedge, what are the next 2-3 products or markets you expand into?",
    helpText: "Show investors you see beyond the starting point.",
    type: "textarea",
    required: true,
    placeholder:
      "e.g., After nailing invoice reconciliation, we add expense management, then full AP/AR automation...",
  },
  {
    id: "c2",
    section: "C",
    sectionTitle: "The Expansion Path",
    label:
      "What does your company look like at $10M ARR? What about $100M? How does the product/market mix change?",
    helpText: "Tests your ability to think at scale.",
    type: "textarea",
    required: true,
    placeholder:
      "e.g., At $10M ARR we're the default tool for DTC finance teams. At $100M we've expanded to...",
  },
  {
    id: "c3",
    section: "C",
    sectionTitle: "The Expansion Path",
    label:
      "What is the biggest risk to your expansion path, and what would prove you wrong?",
    helpText: "Intellectual honesty scores points with investors.",
    type: "textarea",
    required: true,
    placeholder:
      "e.g., The biggest risk is that Shopify builds this natively. We'd be wrong if...",
  },

  // ---- Section D: Traction & Proof Points (5 questions) ----
  {
    id: "d1",
    section: "D",
    sectionTitle: "Traction & Proof Points",
    label:
      "What is your most important metric right now, and what is it?",
    helpText: "Pick ONE metric that best shows your current momentum.",
    type: "select",
    required: true,
    options: ["MRR", "ARR", "GMV", "Active Users", "Revenue", "Other"],
    subFields: [
      {
        id: "d1_value",
        label: "Current value",
        type: "text",
        placeholder: "e.g., $15,000 or 2,500 users",
      },
    ],
  },
  {
    id: "d2",
    section: "D",
    sectionTitle: "Traction & Proof Points",
    label:
      "What has been the month-over-month growth rate of that metric over the last 3 months?",
    helpText: "Enter as a percentage. It's okay if growth is inconsistent — be honest.",
    type: "number",
    required: false,
    placeholder: "e.g., 25",
    subFields: [
      {
        id: "d2_unit",
        label: "Unit",
        type: "text",
        placeholder: "% month-over-month",
      },
    ],
  },
  {
    id: "d3",
    section: "D",
    sectionTitle: "Traction & Proof Points",
    label: "How many paying customers or active users do you have today?",
    type: "number",
    required: false,
    placeholder: "e.g., 47",
  },
  {
    id: "d4",
    section: "D",
    sectionTitle: "Traction & Proof Points",
    label:
      "What is your net revenue retention rate? (If you don't know, say so — that's fine at this stage.)",
    helpText:
      "NRR measures whether existing customers are spending more over time. Over 100% is great.",
    type: "text",
    required: false,
    placeholder: "e.g., 115% or 'Don't know yet'",
  },
  {
    id: "d5",
    section: "D",
    sectionTitle: "Traction & Proof Points",
    label:
      "What is your burn rate and current runway (months)?",
    helpText: "Monthly burn = how much you spend per month. Runway = cash in bank / monthly burn.",
    type: "text",
    required: true,
    placeholder: "e.g., $30K/month burn, $360K in bank, 12 months runway",
    subFields: [
      {
        id: "d5_burn",
        label: "Monthly burn ($)",
        type: "number",
        placeholder: "e.g., 30000",
      },
      {
        id: "d5_cash",
        label: "Cash in bank ($)",
        type: "number",
        placeholder: "e.g., 360000",
      },
    ],
  },

  // ---- Section E: Team & Ask (3 questions) ----
  {
    id: "e1",
    section: "E",
    sectionTitle: "Team & Ask",
    label:
      "Who are the founders? For each: name, role, and the single most relevant thing they've done before this.",
    helpText: "You can add up to 4 founders.",
    type: "founders",
    required: true,
  },
  {
    id: "e2",
    section: "E",
    sectionTitle: "Team & Ask",
    label:
      "How much are you raising, and what will you use it for? Be specific.",
    helpText:
      "Investors want to see that you've thought carefully about capital allocation.",
    type: "textarea",
    required: true,
    placeholder:
      "e.g., Raising $2M. 50% engineering (hire 3 engineers), 30% go-to-market (first sales hire + paid acquisition tests), 20% ops/runway buffer.",
    subFields: [
      {
        id: "e2_amount",
        label: "Raise amount ($)",
        type: "number",
        placeholder: "e.g., 2000000",
      },
    ],
  },
  {
    id: "e3",
    section: "E",
    sectionTitle: "Team & Ask",
    label:
      "What milestones will this round fund you to hit? What does the company look like when you need to raise again?",
    helpText: "Show that you've thought about capital efficiency and next-round readiness.",
    type: "textarea",
    required: true,
    placeholder:
      "e.g., This round gets us to $1M ARR, 200 customers, and Series A readiness in 18 months...",
  },
];

// Helper: get all questions for a given section letter
export function getQuestionsForSection(
  sectionKey: string
): Question[] {
  return QUESTIONS.filter((q) => q.section === sectionKey);
}
