"use client";

import { FormEvent, useState } from "react";
import { loginRequest } from "@/lib/api";
import { setTokens } from "@/lib/auth";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginRequest(username, password);
      setTokens(data.access, data.refresh);
      alert("Login success!");
    } catch {
      setError("Invalid username or password.");
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900">Login</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Sign in to your bookmark collection.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-neutral-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-neutral-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
          >
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}