"use client";

import { useEffect, useState } from "react";
import type { JobApplication } from "@/lib/types";

export interface ApplicationFormValues {
  company: string;
  role: string;
  dateApplied: string;
  jobLink: string;
}

interface ApplicationFormProps {
  // When initial is given, the form is editing that application.
  // When it is not given, the form adds a new one and clears itself.
  initial?: JobApplication;
  submitLabel: string;
  heading?: string;
  // Stacked puts the fields in one column, for the narrow edit
  // form inside a card. The wide add form uses a row instead.
  stacked?: boolean;
  onSubmit: (values: ApplicationFormValues) => void;
  onCancel?: () => void;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

const inputClassName =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

export default function ApplicationForm({
  initial,
  submitLabel,
  heading,
  stacked = false,
  onSubmit,
  onCancel,
}: ApplicationFormProps) {
  const [company, setCompany] = useState(initial?.company ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [dateApplied, setDateApplied] = useState(initial?.dateApplied ?? "");
  const [jobLink, setJobLink] = useState(initial?.jobLink ?? "");

  // Set the default date in the browser after the page loads,
  // so the server render and the first browser render match.
  useEffect(() => {
    if (!initial) setDateApplied(today());
  }, [initial]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!company.trim() || !role.trim()) return;

    onSubmit({
      company: company.trim(),
      role: role.trim(),
      dateApplied,
      jobLink: jobLink.trim(),
    });

    if (!initial) {
      setCompany("");
      setRole("");
      setJobLink("");
      setDateApplied(today());
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-4 shadow-sm sm:p-5"
    >
      {heading && <h2 className="text-base font-semibold">{heading}</h2>}
      <div
        className={`${stacked ? "grid gap-3" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-4"} ${heading ? "mt-3" : ""}`}
      >
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">
            Company
          </span>
          <input
            className={inputClassName}
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="e.g. Shopify"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">
            Role
          </span>
          <input
            className={inputClassName}
            value={role}
            onChange={(event) => setRole(event.target.value)}
            placeholder="e.g. Frontend Developer"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">
            Date applied
          </span>
          <input
            type="date"
            className={inputClassName}
            value={dateApplied}
            onChange={(event) => setDateApplied(event.target.value)}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">
            Job link (optional)
          </span>
          <input
            type="url"
            className={inputClassName}
            value={jobLink}
            onChange={(event) => setJobLink(event.target.value)}
            placeholder="https://..."
          />
        </label>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
