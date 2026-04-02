type DashboardFooterProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onFetchChrome: () => void;
  onOpenGallery: () => void;
};

export default function DashboardFooter({
  searchValue,
  onSearchChange,
  onFetchChrome,
  onOpenGallery,
}: DashboardFooterProps) {
  return (
    <footer className="flex items-center justify-between border-t border-neutral-300 bg-white px-6 py-4">
      <input
        type="text"
        placeholder="Search bookmarks..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-[220px] border-none bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
      />

      <button
        onClick={onFetchChrome}
        className="text-sm font-medium text-neutral-900 hover:opacity-70"
      >
        Fetch from Chrome
      </button>

      <button
        onClick={onOpenGallery}
        className="text-sm font-medium text-neutral-900 hover:opacity-70"
      >
        Gallery
      </button>
    </footer>
  );
}
