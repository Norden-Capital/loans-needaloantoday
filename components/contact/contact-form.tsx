"use client";

/* Contact form.

   Structure, field set and submission logic are UNIFIED across the network:
   same fields, same lib/contact.ts helper, same states. Only the STYLES block
   below and the button markup are site-specific — this site keeps its own
   look on purpose, so the sites don't share a visual fingerprint.

   Site-specific email config lives in app/api/contact/route.ts.            */

import React, { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { submitContactForm, type ContactStatus } from "@/lib/contact";

const TOPICS = [
  "General enquiry",
  "Help with my application",
  "Rates & fees",
  "Repayment & support",
  "Partnerships",
  "Something else",
];

/* ── Site styling — the only part that differs between sites ───────────── */
const FONT: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif" };

const STYLES = {
  form: "space-y-6",
  panel:
    "flex flex-col items-center justify-center text-center min-h-[360px] rounded-2xl border border-[hsl(214,20%,90%)] bg-white p-8",
  label: "text-sm font-medium text-[hsl(215,28%,12%)] mb-2 block",
  field:
    "bg-white border-[hsl(214,20%,90%)] focus-visible:ring-2 focus-visible:ring-[hsl(160,84%,39%)] focus-visible:border-transparent h-12",
  button:
    "gap-2 w-full sm:w-auto bg-[hsl(160,84%,39%)] text-white hover:bg-[hsl(160,84%,35%)] ring-2 ring-[hsl(160,84%,39%)] ring-offset-2 ring-offset-[hsl(210,25%,97%)] outline-none h-11 px-6 rounded-lg text-sm",
};
/* ─────────────────────────────────────────────────────────────────────── */

export function ContactForm() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError("");

    const result = await submitContactForm(e.currentTarget);

    if (!result.ok) {
      setError(result.error);
      setStatus("error");
      return;
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className={STYLES.panel} style={FONT}>
        <div className="w-12 h-12 rounded-full bg-[hsl(160,84%,95%)] flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6 text-[hsl(160,84%,39%)]" />
        </div>
        <h3 className="text-xl font-bold text-[hsl(215,28%,12%)] mb-2">Message sent</h3>
        <p className="text-sm text-[hsl(215,14%,46%)] max-w-xs leading-relaxed">
          Thanks for reaching out — we&apos;ll get back to you within 2 business hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubject("");
            setStatus("idle");
          }}
          className="mt-6 text-sm font-semibold text-[hsl(160,84%,39%)] underline underline-offset-4 hover:opacity-80"
        >
          Send another message
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className={STYLES.form}>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName" className={STYLES.label} style={FONT}>
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            placeholder="John"
            required
            disabled={isSubmitting}
            className={STYLES.field}
            style={FONT}
          />
        </div>
        <div>
          <Label htmlFor="lastName" className={STYLES.label} style={FONT}>
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            placeholder="Doe"
            required
            disabled={isSubmitting}
            className={STYLES.field}
            style={FONT}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email" className={STYLES.label} style={FONT}>
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@example.com"
            required
            disabled={isSubmitting}
            className={STYLES.field}
            style={FONT}
          />
        </div>
        <div>
          <Label htmlFor="subject" className={STYLES.label} style={FONT}>
            Subject
          </Label>
          <NativeSelect
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            disabled={isSubmitting}
            className={STYLES.field}
          >
            <option value="" disabled>
              Loan inquiry
            </option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div>
        <Label htmlFor="message" className={STYLES.label} style={FONT}>
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell us how we can help..."
          required
          disabled={isSubmitting}
          className="bg-white border-[hsl(214,20%,90%)] focus-visible:ring-2 focus-visible:ring-[hsl(160,84%,39%)] focus-visible:border-transparent resize-none"
          style={FONT}
        />
      </div>

      {/* Honeypot — hidden from people, frequently auto-filled by bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute w-px h-px -left-[9999px] opacity-0 pointer-events-none"
      />

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 leading-relaxed" style={FONT}>
          {error}
        </p>
      )}

      <div className="flex justify-start sm:justify-end">
        <Button
          variant="default"
          size="lg"
          type="submit"
          disabled={isSubmitting}
          className={STYLES.button}
          style={FONT}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
