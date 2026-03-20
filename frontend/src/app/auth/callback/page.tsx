"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const access = searchParams.get("access");
        const refresh = searchParams.get("refresh");

        if (access && refresh) {
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            router.replace("/dashboard");
        } else {
            router.replace("/login");
        }
    }, [router, searchParams]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-50">
            <p className="text-sm text-neutral-500">Signing you in...</p>
        </main>
    );
}