import { NextRequest, NextResponse } from "next/server";

// ============================================================
// POST /api/parse-deck
// Receives a pitch deck file (PDF or PPTX), extracts the text,
// and returns structured content for analysis.
// ============================================================

export async function POST(request: NextRequest) {
  try {
    // 1. Get the uploaded file from the form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // 2. Check file type
    const fileName = file.name.toLowerCase();
    const isPDF = fileName.endsWith(".pdf");
    const isPPTX = fileName.endsWith(".pptx");

    if (!isPDF && !isPPTX) {
      return NextResponse.json(
        { error: "Only .pdf and .pptx files are supported" },
        { status: 400 }
      );
    }

    // 3. Check file size (20MB max)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File is too large (max 20MB)" },
        { status: 413 }
      );
    }

    // 4. Convert File to Buffer (Node.js libraries need a buffer)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let rawText = "";
    let slideCount = 1;

    // 5. Parse based on file type
    if (isPDF) {
      // pdf-parse extracts all text from a PDF
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string; numpages: number }>;
      const pdfData = await pdfParse(buffer);
      rawText = pdfData.text;
      slideCount = pdfData.numpages || 1;
    }

    if (isPPTX) {
      // officeparser extracts text from PowerPoint files
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const officeparser = require("officeparser") as { parseOfficeAsync: (buf: Buffer) => Promise<string> };
      rawText = await officeparser.parseOfficeAsync(buffer);
      // Estimate slide count from content breaks (rough heuristic)
      const slideBreaks = rawText.split(/\n{3,}/);
      slideCount = Math.max(slideBreaks.length, 1);
    }

    // 6. Split text into slides (best effort — parsers don't always give per-slide data)
    const slides = rawText
      .split(/\n{3,}/) // Split on triple+ newlines as rough slide boundaries
      .filter((text) => text.trim().length > 0)
      .map((content, index) => ({
        slideNumber: index + 1,
        content: content.trim(),
      }));

    // 7. Return the parsed result
    return NextResponse.json({
      fileName: file.name,
      fileType: isPDF ? "pdf" : "pptx",
      slideCount: Math.max(slideCount, slides.length),
      slides: slides.length > 0 ? slides : [{ slideNumber: 1, content: rawText }],
      rawText: rawText,
    });
  } catch (err) {
    console.error("Deck parsing error:", err);
    return NextResponse.json(
      { error: "Failed to parse the file. Please try a different file or format." },
      { status: 500 }
    );
  }
}
