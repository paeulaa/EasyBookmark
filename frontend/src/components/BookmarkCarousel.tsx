import BookmarkCard from "./BookmarkCard";
import { Bookmark } from "@/types";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

type BookmarkCarouselProps = {
  bookmarks: Bookmark[];
  onDeleteBookmark: (bookmarkId: number) => void;
};

// helper function to get the domain from the url, url prettify
function getDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
export default function BookmarkCarousel({ bookmarks, onDeleteBookmark }: BookmarkCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [draggingLimit, setDraggingLimit] = useState(0);

  useLayoutEffect(() => {
    const calculateDraggingLimit = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const viewportWidth = viewport.offsetWidth;
      const trackWidth = track.offsetWidth;

      const maxDrag = Math.max(0, trackWidth - viewportWidth);
      setDraggingLimit(maxDrag);
    };
    calculateDraggingLimit();

    const ro = new ResizeObserver(calculateDraggingLimit);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [bookmarks]);

  return (
    <div ref={viewportRef} className="w-full flex-1 min-h-0 h-full overflow-hidden">
      <motion.div
        ref={trackRef}
        className="flex h-full w-max gap-5 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -draggingLimit, right: 0 }}
      >
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            id={bookmark.id}
            title={bookmark.title}
            url={getDomain(bookmark.url)}
            onDeleteBookmark={onDeleteBookmark}
          />
        ))}
      </motion.div>
    </div>
  );
}
