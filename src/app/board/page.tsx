"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ApplicationForm, {
  type ApplicationFormValues,
} from "@/components/ApplicationForm";
import ApplicationCard from "@/components/ApplicationCard";
import { applicationsKey, getCurrentUser, logOut } from "@/lib/auth";
import {
  STATUSES,
  type JobApplication,
  type Status,
  type User,
} from "@/lib/types";

// Board key from before accounts existed, kept only so an old saved
// board is handed to the first person who logs in on this browser.
const LEGACY_KEY = "job-hunt-tracker-applications";

const STATUS_DOT: Record<Status, string> = {
  Applied: "bg-sky-500",
  Interview: "bg-amber-500",
  Offer: "bg-emerald-500",
  Rejected: "bg-rose-500",
};

const STATUS_PANEL: Record<Status, string> = {
  Applied: "bg-sky-50",
  Interview: "bg-amber-50",
  Offer: "bg-emerald-50",
  Rejected: "bg-rose-50",
};

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function BoardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Only a logged in user can see a board, and every user loads
  // only their own applications.
  useEffect(() => {
    const current = getCurrentUser();
    if (!current) {
      router.replace("/login");
      return;
    }
    setUser(current);

    const key = applicationsKey(current.email);
    try {
      let saved = window.localStorage.getItem(key);
      if (saved === null) {
        const legacy = window.localStorage.getItem(LEGACY_KEY);
        if (legacy) {
          saved = legacy;
          window.localStorage.setItem(key, legacy);
          window.localStorage.removeItem(LEGACY_KEY);
        }
      }
      if (saved) {
        setApplications(JSON.parse(saved) as JobApplication[]);
      }
    } catch {
      // Saved data is unreadable, start with an empty board.
    }
    setLoaded(true);
  }, [router]);

  // Save every change back to this user's own storage key.
  useEffect(() => {
    if (!loaded || !user) return;
    try {
      window.localStorage.setItem(
        applicationsKey(user.email),
        JSON.stringify(applications),
      );
    } catch {
      // Storage full or unavailable, the board still works for this session.
    }
  }, [applications, loaded, user]);

  function addApplication(values: ApplicationFormValues) {
    const application: JobApplication = {
      id: createId(),
      ...values,
      status: "Applied",
    };
    setApplications((previous) => [application, ...previous]);
  }

  function updateApplication(id: string, values: ApplicationFormValues) {
    setApplications((previous) =>
      previous.map((application) =>
        application.id === id ? { ...application, ...values } : application,
      ),
    );
  }

  function changeStatus(id: string, status: Status) {
    setApplications((previous) =>
      previous.map((application) =>
        application.id === id ? { ...application, status } : application,
      ),
    );
  }

  function deleteApplication(id: string) {
    setApplications((previous) =>
      previous.filter((application) => application.id !== id),
    );
  }

  function handleLogOut() {
    logOut();
    router.push("/");
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-100 via-violet-50 to-white">
        <p className="text-sm text-neutral-500">Loading your board...</p>
      </main>
    );
  }

  const interviewCount = applications.filter(
    (application) => application.status === "Interview",
  ).length;
  const offerCount = applications.filter(
    (application) => application.status === "Offer",
  ).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-amber-50 px-4 py-8 text-neutral-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Job Hunt Tracker
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Hi {user.name} · {applications.length}{" "}
              {applications.length === 1 ? "application" : "applications"} ·{" "}
              {interviewCount}{" "}
              {interviewCount === 1 ? "interview" : "interviews"} ·{" "}
              {offerCount} {offerCount === 1 ? "offer" : "offers"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogOut}
            className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50"
          >
            Log out
          </button>
        </header>

        <div className="mt-6">
          <ApplicationForm
            heading="Add a new application"
            submitLabel="Add application"
            onSubmit={addApplication}
          />
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATUSES.map((status) => {
            const items = applications.filter(
              (application) => application.status === status,
            );
            return (
              <div
                key={status}
                className={`rounded-xl p-4 ${STATUS_PANEL[status]}`}
              >
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${STATUS_DOT[status]}`}
                  />
                  {status}
                  <span className="ml-auto text-xs font-normal text-neutral-500">
                    {items.length}
                  </span>
                </h2>
                <div className="mt-3 space-y-3">
                  {items.length === 0 ? (
                    <p className="text-sm text-neutral-500">
                      Nothing here yet.
                    </p>
                  ) : (
                    items.map((application) => (
                      <ApplicationCard
                        key={application.id}
                        application={application}
                        onStatusChange={changeStatus}
                        onUpdate={updateApplication}
                        onDelete={deleteApplication}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
