type DashboardFooterProps = {
  onFetchChrome: () => void;
  onOpenGallery: () => void;
  onOpenSearch: () => void;
};

export default function DashboardFooter({
  onFetchChrome,
  onOpenGallery,
  onOpenSearch,
}: DashboardFooterProps) {
  return (
    <footer className="flex items-center justify-between border-t border-neutral-300 bg-white px-6 py-4">
      <button
        onClick={onOpenSearch}
        className="text-sm font-medium text-neutral-900 hover:opacity-70"
      >
        Search
      </button>

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