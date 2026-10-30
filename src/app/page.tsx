"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DemoShowcase from "@/components/DemoShowcase";
import { getCurrentUser } from "@/lib/auth";
import type { User } from "@/lib/types";

const FEATURES = [
  {
    title: "Your own account",
    text: "Sign up and log in. Your board is private, only you see your applications.",
  },
  {
    title: "Full CRUD",
    text: "Add, view, edit and delete applications, and move each one across the stages.",
  },
  {
    title: "Four clear stages",
    text: "Applied, Interview, Offer and Rejected, each with its own colour so progress is easy to see.",
  },
  {
    title: "Saves by itself",
    text: "Everything is kept in your browser, so your board is still there when you come back.",
  },
];

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 via-violet-50 to-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="flex items-center justify-between py-5">
          <p className="text-lg font-bold">
            Job Hunt <span className="text-indigo-600">Tracker</span>
          </p>
          <nav className="flex items-center gap-2">
            {user ? (
              <>
                <span className="hidden text-sm text-neutral-600 sm:block">
                  Hi {user.name}
                </span>
                <Link
                  href="/board"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Open my board
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-white"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Sign up free
                </Link>
              </>
            )}
          </nav>
        </header>

        <section className="pb-4 pt-10 text-center sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
            Next.js · TypeScript · Tailwind CSS
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Every application,{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              one simple board
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-600">
            Keep track of every job you apply to. Add the company, move it
            from Applied to Interview to Offer, and never lose sight of
            where things stand.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {user ? (
              <Link
                href="/board"
                className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-indigo-700"
              >
                Go to my board
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-indigo-700"
                >
                  Create your free account
                </Link>
                <Link
                  href="/login"
                  className="rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Demo project. Accounts and data are stored only in your browser.
          </p>
        </section>

        <section className="mx-auto max-w-3xl py-8">
          <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Watch it work
          </h2>
          <DemoShowcase />
        </section>

        <section className="grid gap-4 pb-16 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-neutral-100"
            >
              <h3 className="text-sm font-semibold text-indigo-700">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm text-neutral-600">{feature.text}</p>
            </div>
          ))}
        </section>

        <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
          Job Hunt Tracker, built with Next.js, TypeScript and Tailwind CSS.
        </footer>
      </div>
    </main>
  );
}
