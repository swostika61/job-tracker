"use client";

import { useState } from "react";
import ApplicationForm, {
  type ApplicationFormValues,
} from "./ApplicationForm";
import { STATUSES, type JobApplication, type Status } from "@/lib/types";

interface ApplicationCardProps {
  application: JobApplication;
  onStatusChange: (id: string, status: Status) => void;
  onUpdate: (id: string, values: ApplicationFormValues) => void;
  onDelete: (id: string) => void;
}

// Use the application status to highlight the card's current workflow stage.
const STATUS_BORDER: Record<Status, string> = {
  Applied: "border-t-sky-500",
  Interview: "border-t-amber-500",
  Offer: "border-t-emerald-500",
  Rejected: "border-t-rose-500",
};

export default function ApplicationCard({
  application,
  onStatusChange,
  onUpdate,
  onDelete,
}: ApplicationCardProps) {
  const [editing, setEditing] = useState(false);

  // Replace the card with a pre-filled form while the application is being edited.
  if (editing) {
    return (
      <div className="rounded-lg bg-white shadow-sm">
        <ApplicationForm
          initial={application}
          submitLabel="Save changes"
          stacked
          onSubmit={(values) => {
            // Save the updated fields and return to the read-only card view.
            onUpdate(application.id, values);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  // Parse the date at midnight to avoid timezone shifts when formatting it.
  const formattedDate = application.dateApplied
    ? new Date(`${application.dateApplied}T00:00:00`).toLocaleDateString(
        "en-CA",
        { year: "numeric", month: "short", day: "numeric" },
      )
    : "";

  return (
    <article
      className={`rounded-lg border border-neutral-200 border-t-4 bg-white p-3 shadow-sm ${STATUS_BORDER[application.status]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold leading-snug">
            {application.company}
          </h3>
          <p className="text-sm text-neutral-600">{application.role}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {/* Open the same card in edit mode without navigating away. */}
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-xs font-medium text-indigo-600 transition hover:text-indigo-800 hover:underline"
          >
            Edit
          </button>
          {/* Delete this application through the parent board's state handler. */}
          <button
            type="button"
            onClick={() => onDelete(application.id)}
            aria-label={`Delete ${application.company} application`}
            className="rounded px-1 text-sm leading-none text-neutral-400 transition hover:text-rose-600"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Dates are optional, so omit the row when no date was provided. */}
      {formattedDate && (
        <p className="mt-1 text-xs text-neutral-500">Applied {formattedDate}</p>
      )}

      {/* Open the original job posting in a separate browser tab when available. */}
      {application.jobLink && (
        <a
          href={application.jobLink}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block text-xs font-medium text-indigo-600 hover:underline"
        >
          View posting
        </a>
      )}

      {/* Keep the application stage editable directly from the card. */}
      <label className="mt-3 block">
        <span className="sr-only">Move to another stage</span>
        <select
          value={application.status}
          onChange={(event) =>
            // The options come from STATUSES, so the selected value is a valid status.
            onStatusChange(application.id, event.target.value as Status)
          }
          className="w-full rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-xs outline-none focus:border-indigo-500"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              Move to {status}
            </option>
          ))}
        </select>
      </label>
    </article>
  );
}
