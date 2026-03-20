type FolderOverlayProps = {
    isOpen: boolean;
    /** Distance from viewport top to the bottom of the header (px). White panel starts here and fills to the bottom. */
    topPx: number;
    folders: string[];
    selectedFolder: string;
    onClose: () => void;
    onSelectFolder: (folder: string) => void;
    onCreateFolder: () => void;
};

export default function FolderOverlay({
    isOpen,
    topPx,
    folders,
    selectedFolder,
    onClose,
    onSelectFolder,
    onCreateFolder,
}: FolderOverlayProps) {
    if (!isOpen) return null;

    const safeTop = Math.max(topPx, 48);

    return (
        <>
            {/* Full-screen dim; header (z-60) stays above */}
            <button
                type="button"
                aria-label="Close folder overlay"
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/20"
            />

            {/* Full viewport below navbar: white sheet to bottom edge */}
            <div
                className="fixed inset-x-0 bottom-0 z-50 flex min-h-0 flex-col overflow-y-auto bg-white shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.12)]"
                style={{ top: safeTop }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="folder-overlay-heading"
            >
                <div className="mx-auto flex min-h-full w-full max-w-4xl flex-1 flex-col px-6 pb-10 pt-4">




                    <div className="mx-auto mt-6 w-full max-w-2xl flex-1">
                        <button
                            type="button"
                            onClick={onCreateFolder}
                            className="block w-full border-b border-neutral-300 pb-2 text-center text-base italic text-neutral-400 outline-none hover:text-neutral-600 sm:text-lg"
                        >
                            insert your folder name
                        </button>

                        <div className="mt-6 space-y-4 text-center sm:space-y-5">
                            {folders.map((folder) => {
                                const isActive = folder === selectedFolder;

                                return (
                                    <button
                                        type="button"
                                        key={folder}
                                        onClick={() => {
                                            onSelectFolder(folder);
                                            onClose();
                                        }}
                                        className={`block w-full text-2xl font-semibold transition sm:text-3xl ${isActive
                                            ? "text-neutral-900"
                                            : "text-neutral-400 hover:text-neutral-700"
                                            }`}
                                    >
                                        {folder}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
