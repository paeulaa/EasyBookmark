"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/lib/api";
import { clearTokens, getAccessToken } from "@/lib/auth";
import type { User } from "@/types";
import FolderChips from "@/components/FolderChips";
import BookmarkCarousel from "@/components/BookmarkCarousel";

const mockFolders = ["All", "Design", "Research", "Tools", "Reading"];

const mockBookmarks = [
    { id: 1, title: "Notion Design System", domain: "notion.so" },
    { id: 2, title: "Mobbin Inspiration", domain: "mobbin.com" },
    { id: 3, title: "Awwwards Collection", domain: "awwwards.com" },
    { id: 4, title: "Vercel Docs", domain: "vercel.com" },
    { id: 5, title: "Figma Community", domain: "figma.com" },
];

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedFolder, setSelectedFolder] = useState("All");

    function handleLogout() {
        clearTokens();
        router.replace("/");
    }

    useEffect(() => {
        async function loadUser() {
            const token = getAccessToken();

            if (!token) {
                router.replace("/");
                return;
            }

            try {
                const data = await loginRequest(token);
                setUser(data);
            } catch {
                clearTokens();
                router.replace("/");
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [router]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-50">
                <p className="text-sm text-neutral-500">Loading dashboard...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-900">
            <div className="mx-auto max-w-7xl px-6 py-8">
                <header className="flex items-center justify-between border-b border-neutral-200 pb-5">
                    <div>
                        <p className="text-sm text-neutral-500">Bookmark App</p>
                        <h1 className="mt-1 text-2xl font-semibold">Your Collection</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-neutral-900">
                                {user?.username}
                            </p>
                            <p className="text-sm text-neutral-500">{user?.email}</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="rounded-full border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100"
                        >
                            Sign out
                        </button>
                    </div>
                </header>

                <section className="mt-8">
                    <FolderChips
                        folders={mockFolders}
                        selectedFolder={selectedFolder}
                        onSelect={setSelectedFolder}
                    />
                </section>

                <section className="mt-10">
                    <BookmarkCarousel bookmarks={mockBookmarks} />
                </section>
            </div>
        </main>
    );
}