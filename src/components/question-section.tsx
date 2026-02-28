"use client";

import { Question, QuestionnaireAnswers, Founder } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ============================================================
// Renders all the questions for one section of the questionnaire.
// Handles text, textarea, number, select, and "founders" input types.
// ============================================================

interface QuestionSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  questions: Question[];
  answers: QuestionnaireAnswers;
  errors: Record<string, string>;
  onChange: (questionId: string, value: unknown) => void;
}

export default function QuestionSection({
  sectionTitle,
  sectionSubtitle,
  questions,
  answers,
  errors,
  onChange,
}: QuestionSectionProps) {
  return (
    <div className="space-y-8">
      {/* Section heading */}
      <div>
        <h2 className="text-2xl font-bold">{sectionTitle}</h2>
        <p className="text-muted-foreground mt-1">{sectionSubtitle}</p>
      </div>

      {/* Render each question */}
      {questions.map((q) => (
        <div key={q.id} className="space-y-2">
          {/* Question label */}
          <Label htmlFor={q.id} className="text-base font-medium leading-relaxed">
            {q.label}
            {q.required && <span className="text-destructive ml-1">*</span>}
          </Label>

          {/* Help text (if any) */}
          {q.helpText && (
            <p className="text-sm text-muted-foreground">{q.helpText}</p>
          )}

          {/* The actual input — depends on question type */}
          {q.type === "textarea" && (
            <Textarea
              id={q.id}
              placeholder={q.placeholder}
              value={(answers[q.id] as string) || ""}
              onChange={(e) => onChange(q.id, e.target.value)}
              rows={4}
              className="resize-y"
            />
          )}

          {q.type === "text" && (
            <Input
              id={q.id}
              type="text"
              placeholder={q.placeholder}
              value={(answers[q.id] as string) || ""}
              onChange={(e) => onChange(q.id, e.target.value)}
            />
          )}

          {q.type === "number" && (
            <Input
              id={q.id}
              type="number"
              placeholder={q.placeholder}
              value={(answers[q.id] as string) || ""}
              onChange={(e) => onChange(q.id, e.target.value)}
            />
          )}

          {q.type === "select" && q.options && (
            <Select
              value={(answers[q.id] as string) || ""}
              onValueChange={(val) => onChange(q.id, val)}
            >
              <SelectTrigger id={q.id}>
                <SelectValue placeholder="Select one..." />
              </SelectTrigger>
              <SelectContent>
                {q.options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Founders input — a dynamic list of founder cards */}
          {q.type === "founders" && (
            <FoundersInput
              founders={(answers[q.id] as Founder[]) || [{ name: "", role: "", background: "" }]}
              onChange={(founders) => onChange(q.id, founders)}
            />
          )}

          {/* Sub-fields (extra numeric inputs below the main question) */}
          {q.subFields && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pl-0 sm:pl-4 border-l-0 sm:border-l-2 border-muted">
              {q.subFields.map((sf) => (
                <div key={sf.id} className="space-y-1">
                  <Label htmlFor={sf.id} className="text-sm text-muted-foreground">
                    {sf.label}
                  </Label>
                  <Input
                    id={sf.id}
                    type={sf.type}
                    placeholder={sf.placeholder}
                    value={(answers[sf.id] as string) || ""}
                    onChange={(e) => onChange(sf.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Validation error message */}
          {errors[q.id] && (
            <p className="text-sm text-destructive">{errors[q.id]}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Founders sub-component — lets users add up to 4 founders.
// Each founder has name, role, and background fields.
// ============================================================

interface FoundersInputProps {
  founders: Founder[];
  onChange: (founders: Founder[]) => void;
}

function FoundersInput({ founders, onChange }: FoundersInputProps) {
  // Update one field of one founder
  const updateFounder = (
    index: number,
    field: keyof Founder,
    value: string
  ) => {
    const updated = [...founders];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  // Add a new blank founder (max 4)
  const addFounder = () => {
    if (founders.length < 4) {
      onChange([...founders, { name: "", role: "", background: "" }]);
    }
  };

  // Remove a founder
  const removeFounder = (index: number) => {
    if (founders.length > 1) {
      onChange(founders.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-4">
      {founders.map((founder, index) => (
        <div
          key={index}
          className="rounded-lg border p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Founder {index + 1}
            </span>
            {founders.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFounder(index)}
                className="text-muted-foreground hover:text-destructive h-auto p-1"
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-sm">Name</Label>
              <Input
                placeholder="Full name"
                value={founder.name}
                onChange={(e) => updateFounder(index, "name", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm">Role</Label>
              <Input
                placeholder="e.g., CEO, CTO"
                value={founder.role}
                onChange={(e) => updateFounder(index, "role", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm">
              Most relevant prior experience
            </Label>
            <Textarea
              placeholder="e.g., Led product at Stripe for 4 years, focused on payments infrastructure"
              value={founder.background}
              onChange={(e) =>
                updateFounder(index, "background", e.target.value)
              }
              rows={2}
            />
          </div>
        </div>
      ))}

      {/* Add founder button (max 4) */}
      {founders.length < 4 && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addFounder}
        >
          + Add another founder
        </Button>
      )}
    </div>
  );
}
