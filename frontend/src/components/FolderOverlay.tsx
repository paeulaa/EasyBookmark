import { useState } from "react";
import { Folder } from "@/types";

type FolderOverlayProps = {
    isOpen: boolean;
    /** Distance from viewport top to the bottom of the header (px). 
     * White panel starts here and fills to the bottom. */
    topPx: number;
    folders: Folder[];
    selectedFolder: string;
    onClose: () => void;
    onSelectFolder: (folderName: string) => void;
    onCreateFolder: (name: string) => void;
    onDeleteFolder: (folderId: number) => void;
};

export default function FolderOverlay({
    isOpen,
    topPx,
    folders,
    selectedFolder,
    onClose,
    onSelectFolder,
    onCreateFolder,
    onDeleteFolder,
}: FolderOverlayProps) {
    // 新增的 folder 名稱
    const [newFolderName, setNewFolderName] = useState("");

    if (!isOpen) return null;

    const safeTop = Math.max(topPx, 48);

    function handleCreateFolderSubmit() {
        if (!newFolderName.trim()) return;
        onCreateFolder(newFolderName);
        setNewFolderName("");
    }

    return (
        <>
            {/* Full-screen dim; header (z-60) stays above */}
            <button
                type="button"
                aria-label="Close folder overlay"
                onClick={onClose}
                className="fixed inset-0 z-40 bg-black/20"
            />

            {/* Full viewport below navbar: white sheet to bottom edge (list scrolls inside, not whole panel) */}
            <div
                className="fixed inset-x-0 bottom-0 z-50 flex min-h-0 flex-col overflow-hidden bg-white shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.12)]"
                style={{ top: safeTop }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="folder-overlay-heading"
            >
                <div className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col px-6 pb-10 pt-4">
                    <h2 id="folder-overlay-heading" className="sr-only">
                        Folders
                    </h2>
                    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-6">
                        <div className="shrink-0">
                            <div className="flex items-center gap-3 border-b border-neutral-300 pb-2">
                                <input
                                    type="text"
                                    placeholder="Enter folder name"
                                    value={newFolderName}
                                    onChange={(e) => setNewFolderName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleCreateFolderSubmit();
                                        }
                                    }}
                                    className="min-w-0 flex-1 bg-transparent text-left text-base text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-lg"
                                />
                                <button
                                    type="button"
                                    aria-label="Create folder"
                                    onClick={handleCreateFolderSubmit}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-lg font-medium leading-none text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                                >
                                    <span aria-hidden className="-mt-px">
                                        +
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div
                            className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain"
                            role="listbox"
                            aria-label="Folders"
                        >
                            <div className="space-y-4 text-center sm:space-y-5">
                                {[
                                    { id: "all", name: "All" },
                                    ...folders,
                                ].map((folder) => {
                                    const isActive = folder.name === selectedFolder;
                                    const isAll = folder.id === "all";

                                    return (
                                        <div
                                            key={folder.id}
                                            className="group flex items-center justify-center gap-3"
                                        >
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={isActive}
                                                onClick={() => {
                                                    onSelectFolder(folder.name);
                                                    onClose();
                                                }}
                                                className={`block text-2xl font-semibold transition sm:text-3xl ${isActive
                                                        ? "text-neutral-900"
                                                        : "text-neutral-400 hover:text-neutral-700"
                                                    }`}
                                            >
                                                {folder.name}
                                            </button>

                                            {!isAll && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        const confirmed = window.confirm(
                                                            `Delete folder "${folder.name}"?`
                                                        );
                                                        if (!confirmed) return;

                                                        onDeleteFolder(Number(folder.id));
                                                    }}
                                                    className="opacity-0 transition group-hover:opacity-100 text-sm text-neutral-400 hover:text-red-500"
                                                    aria-label={`Delete ${folder.name}`}
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
