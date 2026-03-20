"use client";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function LandingPage() {
  function handleLogin() {
    window.location.href = `${BACKEND_BASE_URL}/accounts/google/login/`;
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm text-neutral-500">Visual bookmark collection</p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-neutral-900">
            Save links you care about,
            <br />
            come back visually.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
            Organize your bookmarks into a clean visual collection with folders,
            cards, and quick access across your workflow.
          </p>

          <div className="mt-8">
            <button
              onClick={handleLogin}
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}