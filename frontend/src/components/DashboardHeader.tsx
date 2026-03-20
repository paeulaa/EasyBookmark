type DashboardHeaderProps = {
    currentFolder: string;
    /** Opens folder sheet if closed; closes if already open (same as header chevron tap). */
    onToggleFolders: () => void;
    onOpenProfile: () => void;
    onAddBookmark: () => void;
};

export default function DashboardHeader({
    currentFolder,
    onToggleFolders,
    onOpenProfile,
    onAddBookmark,
}: DashboardHeaderProps) {
    return (
        <header className="relative z-60 flex items-center justify-between border-b border-neutral-300 bg-white px-6 py-4">
            <button
                onClick={onOpenProfile}
                className="text-sm font-medium text-neutral-800 hover:opacity-70"
            >
                Profile
            </button>

            <button
                type="button"
                onClick={onToggleFolders}
                className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-neutral-900 hover:opacity-80"
            >
                <span>{currentFolder}</span>
                <span className="text-lg">▾</span>
            </button>

            <button
                onClick={onAddBookmark}
                className="text-sm font-medium text-neutral-800 hover:opacity-70"
            >
                Add Bookmark
            </button>
        </header>
    );
}