"use client";

// The demo on the home page is a real recording of this app being
// used: sign up, add two applications, edit one, move one to Offer,
// delete one. It was recorded by driving the running app with
// Playwright, and the video file lives in public/demo.webm.

export default function DemoShowcase() {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-neutral-200">
        <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 rounded-md bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
            job-hunt-tracker / demo
          </span>
        </div>
        <video
          className="block aspect-[8/5] w-full bg-indigo-50"
          src="/demo.webm"
          poster="/demo-poster.png"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      </div>
      <p className="mt-4 text-center text-sm font-medium text-indigo-700">
        Sign up, add, edit, move and delete, a real recording of the app
      </p>
    </div>
  );
}
