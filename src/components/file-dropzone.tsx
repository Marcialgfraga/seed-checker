"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// ============================================================
// Drag-and-drop file upload component.
// Accepts .pdf and .pptx files only, max 20MB.
// ============================================================

interface FileDropzoneProps {
  onFileSelected: (file: File) => void;
  isUploading: boolean;
  selectedFile: File | null;
  error?: string;
}

// 20MB in bytes
const MAX_FILE_SIZE = 20 * 1024 * 1024;

export default function FileDropzone({
  onFileSelected,
  isUploading,
  selectedFile,
  error,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Validate the file type and size
  const validateFile = (file: File): string | null => {
    const name = file.name.toLowerCase();
    if (!name.endsWith(".pdf") && !name.endsWith(".pptx")) {
      return "Only .pdf and .pptx files are accepted";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File is too large (max 20MB)";
    }
    return null;
  };

  // Handle a file being selected (either by drop or by file picker)
  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setFileError(validationError);
        return;
      }
      setFileError(null);
      onFileSelected(file);
    },
    [onFileSelected]
  );

  // Drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  // Click to open file picker
  const handleClick = () => {
    if (!isUploading) {
      inputRef.current?.click();
    }
  };

  // File picker selection
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const displayError = error || fileError;

  return (
    <div className="space-y-3">
      {/* The drop zone */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10
          cursor-pointer transition-colors
          ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"}
          ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {/* Upload icon (simple SVG) */}
        <svg
          className="h-10 w-10 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>

        {selectedFile ? (
          <p className="text-sm text-foreground font-medium">
            {selectedFile.name}{" "}
            <span className="text-muted-foreground font-normal">
              ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
            </span>
          </p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Drag and drop your pitch deck here, or{" "}
              <span className="text-foreground font-medium underline">
                click to browse
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Accepts .pdf and .pptx (max 20MB)
            </p>
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.pptx"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Error message */}
      {displayError && (
        <p className="text-sm text-destructive">{displayError}</p>
      )}
    </div>
  );
}
