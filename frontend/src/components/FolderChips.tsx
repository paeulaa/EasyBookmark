type FolderChipsProps = {
    folders: string[];
    selectedFolder: string;
    onSelect: (folder: string) => void;
};

export default function FolderChips({
    folders,
    selectedFolder,
    onSelect,
}: FolderChipsProps) {
    return (
        <div className="flex gap-3 overflow-x-auto pb-2">
            {folders.map((folder) => {
                const isActive = selectedFolder === folder;

                return (
                    <button
                        key={folder}
                        onClick={() => onSelect(folder)}
                        className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${isActive
                                ? "border-neutral-900 bg-neutral-900 text-white"
                                : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
                            }`}
                    >
                        {folder}
                    </button>
                );
            })}
        </div>
    );
}