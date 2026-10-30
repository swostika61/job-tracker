# Job Hunt Tracker

A simple board to track my job applications while I search for my next frontend role. I built it because I was keeping my applications in random notes and losing track of who replied and who did not.

**Live demo:** add your Vercel link here after you deploy

## What it does

- A home page that explains the app, with a short demo video of the real app being used
- Sign up and log in, so every user gets their own private board
- Add an application with company, role, date applied, and the job posting link
- Board with four stages: Applied, Interview, Offer, Rejected, each with its own colour
- Full CRUD: create, view, edit and delete applications, and move each one to another stage
- Counts at the top: total applications, interviews, and offers
- Everything saves in the browser with localStorage, under a separate key for each user, so the board is still there when you come back

## One honest note about the accounts

The sign up and log in are demo level, built to show the flow. Accounts are stored in the browser, and passwords are kept as a simple hash, not plain text. This is not real security. A production app would check passwords on a server, store them with a strong hash like bcrypt, and keep the data in a database. The code says this in `src/lib/auth.ts` too.

## The demo video

The video on the home page is a real screen recording of this app, not a mockup. It was recorded with Playwright driving the running app: sign up, add two applications, edit one, move one to Offer, delete one. The file is `public/demo.webm`.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React state with useState and useEffect
- localStorage for accounts, sessions and data, no backend needed
- Playwright, used to record the demo video

## Run it on your computer

You need Node.js installed. Then:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Which file does what

- `src/app/page.tsx` — the home page: what the app is, the demo video, and the sign up and log in buttons.
- `src/app/signup/page.tsx` — the sign up form. Creates the account and opens the board.
- `src/app/login/page.tsx` — the log in form.
- `src/app/board/page.tsx` — the board itself. It checks that a user is logged in, loads only that user's applications, and holds the add, edit, move and delete actions.
- `src/app/layout.tsx` — the page wrapper and the browser tab title.
- `src/components/ApplicationForm.tsx` — one form used two ways: adding a new application, and editing an existing one.
- `src/components/ApplicationCard.tsx` — one card: company, role, date, posting link, edit, delete, and the move dropdown.
- `src/components/DemoShowcase.tsx` — the demo video player on the home page.
- `src/lib/types.ts` — the TypeScript types: the four stages, the shape of one application, and the user.
- `src/lib/auth.ts` — sign up, log in, log out, the current user, and the storage key for each user's board.
- `public/demo.webm` — the demo video shown on the home page.

## Put it on GitHub

1. On github.com, create a new repository named `job-tracker`. Do not add a README there, this project already has one.
2. In this project folder, run:

```bash
git init
git add .
git commit -m "Job hunt tracker with accounts and CRUD"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/job-tracker.git
git push -u origin main
```

3. Refresh the GitHub page. Your code and this README will be there.

## Deploy it free on Vercel

1. Go to vercel.com and sign in with your GitHub account.
2. Click "Add New Project" and pick the `job-tracker` repository.
3. Leave every setting as it is and click Deploy.
4. When it finishes, Vercel gives you a live link. Paste that link at the top of this README, and add it to your portfolio and LinkedIn.

## Ideas to add later

- Real accounts with a database and server side auth
- Drag and drop cards between columns instead of the dropdown
- A search box to filter by company
- A notes field on each card, for interview dates and follow ups
- Sort each column by date applied
- Dark mode

## What I can say about it in an interview

I built this to manage my own job search. It is a small Next.js and TypeScript app with a board layout and full CRUD, so I can add, edit, move and delete applications. It also has sign up and log in: the board page checks for a logged in user, and every user's applications are saved under their own key, so boards stay private. I am clear that the auth is demo level, done in the browser to show the flow. In a real product I would move it to a server and a database. The demo video on the home page is a real recording too, I made it by automating the app with Playwright.
