"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser, logIn } from "@/lib/auth";

const inputClassName =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Already logged in? Go straight to the board.
  useEffect(() => {
    if (getCurrentUser()) router.replace("/board");
  }, [router]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = logIn(email, password);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    router.push("/board");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-100 via-violet-50 to-white px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          ← Back to home
        </Link>
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-2xl bg-white p-6 shadow-md sm:p-8"
        >
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Log in to see your own job board.
          </p>

          {error && (
            <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          )}

          <label className="mt-5 block">
            <span className="mb-1 block text-xs font-medium text-neutral-500">
              Email
            </span>
            <input
              type="email"
              className={inputClassName}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-1 block text-xs font-medium text-neutral-500">
              Password
            </span>
            <input
              type="password"
              className={inputClassName}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              required
            />
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Log in
          </button>

          <p className="mt-4 text-center text-sm text-neutral-600">
            New here?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
