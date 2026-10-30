import type { User } from "./types";

// Demo authentication for a portfolio project.
//
// Accounts and the login session are kept in the browser (localStorage),
// so the app runs anywhere with no backend or database. Passwords are
// stored as a simple hash, never as plain text, but be clear: this is
// NOT real security. A production app would send the password to a
// server and store it there with a strong hash like bcrypt or argon2.

const USERS_KEY = "job-hunt-tracker-users";
const SESSION_KEY = "job-hunt-tracker-session";

interface StoredUser extends User {
  passwordHash: string;
}

// Small demo hash so passwords are not readable at a glance.
// Deliberately simple, see the note at the top of this file.
function hashPassword(password: string): string {
  let hash = 5381;
  for (let i = 0; i < password.length; i++) {
    hash = (hash * 33) ^ password.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

function readUsers(): StoredUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export type AuthResult = { user: User } | { error: string };

export function signUp(
  name: string,
  email: string,
  password: string,
): AuthResult {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanName) return { error: "Please enter your name." };
  if (!cleanEmail.includes("@")) {
    return { error: "Please enter a valid email address." };
  }
  if (password.length < 6) {
    return { error: "Password needs at least 6 characters." };
  }

  const users = readUsers();
  if (users.some((user) => user.email === cleanEmail)) {
    return {
      error: "An account with this email already exists. Try logging in.",
    };
  }

  const stored: StoredUser = {
    name: cleanName,
    email: cleanEmail,
    passwordHash: hashPassword(password),
  };
  writeUsers([...users, stored]);
  window.localStorage.setItem(SESSION_KEY, cleanEmail);
  return { user: { name: stored.name, email: stored.email } };
}

export function logIn(email: string, password: string): AuthResult {
  const cleanEmail = email.trim().toLowerCase();
  const found = readUsers().find((user) => user.email === cleanEmail);
  if (!found || found.passwordHash !== hashPassword(password)) {
    return { error: "Email or password is not correct." };
  }
  window.localStorage.setItem(SESSION_KEY, cleanEmail);
  return { user: { name: found.name, email: found.email } };
}

export function logOut() {
  window.localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  try {
    const email = window.localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    const found = readUsers().find((user) => user.email === email);
    return found ? { name: found.name, email: found.email } : null;
  } catch {
    return null;
  }
}

// Every user gets their own saved board, under their own key,
// so one person's applications never show on another person's board.
export function applicationsKey(email: string): string {
  return `job-hunt-tracker-apps-${email}`;
}
