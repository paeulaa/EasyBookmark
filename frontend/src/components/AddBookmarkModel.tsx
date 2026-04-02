"use client";

import { useState } from "react";

type AddBookmarkModelProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        title: string;
        url: string;
        note?: string;
    }) => void;
}

export default function AddBookmarkModel({
    isOpen,
    onClose,
    onSubmit,
}: AddBookmarkModelProps) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Add Bookmark</h2>

                <input
                    type="text"
                    placeholder="Title"
                    className="mb-3 w-full rounded border px-3 py-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="URL"
                    className="mb-4 w-full rounded border px-3 py-2"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded border px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="rounded bg-neutral-900 px-4 py-2 text-white"
                        onClick={() => {
                            if (!title.trim() || !url.trim()) {
                                alert("Please fill in all fields");
                                return;
                            }
                            onSubmit({
                                title: title.trim(),
                                url: url.trim(),
                            });
                        }}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}