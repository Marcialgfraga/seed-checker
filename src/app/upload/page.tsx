"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FileDropzone from "@/components/file-dropzone";
import { ParsedDeck } from "@/lib/types";
import { saveParsedDeck, loadParsedDeck } from "@/lib/storage";

// ============================================================
// Deck upload page.
// Users can upload a PDF or PPTX pitch deck for analysis,
// or skip this step and analyze based on questionnaire only.
// ============================================================

export default function UploadPage() {
  const router = useRouter();

  // The file the user selected (before uploading)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Parsing state
  const [isUploading, setIsUploading] = useState(false);
  const [parsedDeck, setParsedDeck] = useState<ParsedDeck | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load any previously parsed deck from localStorage
  useEffect(() => {
    const saved = loadParsedDeck();
    if (saved) setParsedDeck(saved);
  }, []);

  // Handle file selection
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setParsedDeck(null); // Clear previous parse result
    setError(null);
  };

  // Upload and parse the deck
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      // Send the file to our parsing API route
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/parse-deck", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to parse the file");
        return;
      }

      // Save the parsed deck to localStorage and update state
      const deck = data as ParsedDeck;
      saveParsedDeck(deck);
      setParsedDeck(deck);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Continue to analysis
  const handleRunAnalysis = () => {
    router.push("/analyzing");
  };

  // Skip deck upload entirely
  const handleSkip = () => {
    router.push("/analyzing");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <a
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Seed Round Readiness Analyzer
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-2xl px-6 py-8">
        <h2 className="text-2xl font-bold">Upload Your Pitch Deck</h2>
        <p className="text-muted-foreground mt-2 mb-8">
          Upload your pitch deck so we can cross-reference it with your
          questionnaire answers. This step is optional — you can skip it and
          get analysis based on your questionnaire alone.
        </p>

        {/* File drop zone */}
        <FileDropzone
          onFileSelected={handleFileSelected}
          isUploading={isUploading}
          selectedFile={selectedFile}
          error={error || undefined}
        />

        {/* Upload button (shown after file is selected but before parsing) */}
        {selectedFile && !parsedDeck && (
          <div className="mt-4">
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full sm:w-auto"
            >
              {isUploading ? "Parsing..." : "Upload & Parse"}
            </Button>
          </div>
        )}

        {/* Parse result (shown after successful parsing) */}
        {parsedDeck && (
          <div className="mt-6 rounded-lg border bg-muted/30 p-4">
            <p className="font-medium text-foreground">
              Deck parsed successfully
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {parsedDeck.fileName} — {parsedDeck.slideCount} slides,{" "}
              {parsedDeck.rawText.length.toLocaleString()} characters extracted
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          {/* Back to questionnaire */}
          <Button
            variant="outline"
            onClick={() => router.push("/questionnaire")}
          >
            Back to Questionnaire
          </Button>

          {/* Run analysis (primary action) */}
          <Button onClick={handleRunAnalysis}>
            {parsedDeck ? "Run Analysis" : "Analyze Without Deck"}
          </Button>
        </div>

        {/* Skip link */}
        {!parsedDeck && (
          <p className="text-center mt-6">
            <button
              onClick={handleSkip}
              className="text-sm text-muted-foreground underline hover:text-foreground"
            >
              Skip — analyze based on questionnaire only
            </button>
          </p>
        )}
      </main>
    </div>
  );
}
