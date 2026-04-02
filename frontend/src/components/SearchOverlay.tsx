import { Bookmark } from "@/types";

type SearchOverlayProps = {
    isOpen: boolean;
    topPx: number;
    searchValue: string;
    onSearchChange: (value: string) => void;
    results: Bookmark[];
    onClose: () => void;
};

export default function SearchOverlay({
    isOpen,
    topPx,
    searchValue,
    onSearchChange,
    results,
    onClose,
}: SearchOverlayProps) {
    if (!isOpen) return null;

    const safeTop = Math.max(topPx, 48);

    return (
        <>
            <button
                type="button"
                aria-label="Close search overlay"
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/20"
            />

            <div
                className="fixed inset-x-0 bottom-0 z-50 flex min-h-0 flex-col overflow-hidden bg-white shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.12)]"
                style={{ top: safeTop }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="search-overlay-heading"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="text-sm text-neutral-400 hover:text-neutral-700"
                    aria-label="Close search"
                >
                    ✕
                </button>
                <div className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col px-6 pb-10 pt-4">
                    <h2 id="search-overlay-heading" className="sr-only">
                        Search
                    </h2>

                    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-6">
                        <div className="shrink-0 border-b border-neutral-300 pb-2">
                            <input
                                type="text"
                                placeholder="Search bookmarks..."
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full text-center text-base outline-none sm:text-lg"
                            />
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto space-y-4 text-center">
                            {results.map((bookmark) => (
                                <div key={bookmark.id}>
                                    {bookmark.title}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}