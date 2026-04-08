import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import BookmarkCard from "./BookmarkCard";
import { Bookmark } from "@/types";

type BookmarkCarouselProps = {
  bookmarks: Bookmark[];
  onDeleteBookmark: (bookmarkId: number) => void;
  onActiveIndexChange?: (index: number) => void;
};

function getDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/** Stack / rail layout (same idea as earlier carousel prototype) */
const CARD_WIDTH = 400;
const LEFT_RAIL_WIDTH = 84;
const LEFT_STEP = 30;
const RIGHT_PEEK_OFFSET = 100;
/** Extra horizontal scroll per “step” toward the next bookmark (tune feel) */
const SCROLL_STEP = 180;
/** First card starts near the visible left edge (scroll content coords), not centered */
const START_GUTTER = 30;

function BookmarkCarouselInner({
  bookmarks,
  onDeleteBookmark,
  onActiveIndexChange,
}: BookmarkCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  const n = bookmarks.length;

  const innerWidth = useMemo(() => {
    if (viewportW === 0) return 0;
    if (n <= 1) return viewportW;
    const scrollable = (n - 1) * SCROLL_STEP;
    const minForScroll = viewportW + scrollable;
    // scrollLeft=0, active=0: main left-aligned at START_GUTTER + right peeks
    const maxRightStack =
      START_GUTTER +
      CARD_WIDTH +
      Math.max(0, n - 2) * RIGHT_PEEK_OFFSET +
      CARD_WIDTH +
      48;
    return Math.max(minForScroll, maxRightStack);
  }, [n, viewportW]);

  const maxScroll = Math.max(0, innerWidth - viewportW);

  const activeIndex = useMemo(() => {
    if (n <= 1) return 0;
    const ratio = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    return Math.round(ratio * (n - 1));
  }, [n, maxScroll, scrollLeft]);

  const resolvedIndex = n === 0 ? 0 : Math.min(activeIndex, n - 1);

  /**
   * Main card left edge:
   * - First / no left rails: align to the visible left (+ START_GUTTER), not viewport center.
   * - With left rails: pin the leftmost rail’s left edge to `scrollLeft` so overflow can clip the stack on the left.
   */
  const anchorX = useMemo(() => {
    if (viewportW === 0) return 0;
    if (resolvedIndex <= 0) return scrollLeft + START_GUTTER;
    return scrollLeft + LEFT_RAIL_WIDTH + (resolvedIndex - 1) * LEFT_STEP;
  }, [scrollLeft, viewportW, resolvedIndex]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollLeft(el.scrollLeft);
  }, []);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const sync = () => {
      setViewportW(el.clientWidth);
      setScrollLeft(el.scrollLeft);
    };
    sync();

    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollLeft(el.scrollLeft);
  }, [innerWidth]);

  useEffect(() => {
    onActiveIndexChange?.(resolvedIndex);
  }, [resolvedIndex, onActiveIndexChange]);

  function scrollToIndex(index: number) {
    const el = scrollRef.current;
    if (!el || n <= 1) return;
    const clamped = Math.max(0, Math.min(n - 1, index));
    const ratio = (n - 1) === 0 ? 0 : clamped / (n - 1);
    const target = ratio * maxScroll;
    el.scrollTo({ left: target, behavior: "smooth" });
  }

  return (
    <div className="w-full min-h-0 flex-1">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide relative h-[520px] w-full overflow-x-auto overflow-y-hidden pb-1"
      >
        {viewportW > 0 && innerWidth > 0 && (
          <div
            className="relative h-[520px]"
            style={{ width: innerWidth, minWidth: innerWidth }}
          >
            {bookmarks.map((bookmark, index) => {
              const distance = index - resolvedIndex;
              let x = 0;
              let width = CARD_WIDTH;

              if (distance < 0) {
                const previousOrder = resolvedIndex - 1 - index;
                width = LEFT_RAIL_WIDTH;
                x = anchorX - LEFT_RAIL_WIDTH - previousOrder * LEFT_STEP;
              } else if (distance === 0) {
                width = CARD_WIDTH;
                x = anchorX;
              } else {
                width = CARD_WIDTH;
                x = anchorX + CARD_WIDTH + (distance - 1) * RIGHT_PEEK_OFFSET;
              }

              return (
                <motion.div
                  key={bookmark.id}
                  className={`absolute top-0 overflow-hidden rounded-[28px] ${index !== resolvedIndex ? "cursor-pointer" : ""}`}
                  animate={{ x, width }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  style={{
                    // Stack order: further left = further back; right peeks sit above main (distance > 0).
                    zIndex: 100 + distance,
                  }}
                  onClick={() => {
                    if (index !== resolvedIndex) {
                      scrollToIndex(index);
                    }
                  }}
                >
                  <BookmarkCard
                    id={bookmark.id}
                    title={bookmark.title}
                    url={getDomain(bookmark.url)}
                    onDeleteBookmark={onDeleteBookmark}
                    cardWidth={width}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookmarkCarousel(props: BookmarkCarouselProps) {
  const bookmarkIdsKey = useMemo(
    () => props.bookmarks.map((b) => b.id).join(","),
    [props.bookmarks],
  );

  return <BookmarkCarouselInner key={bookmarkIdsKey} {...props} />;
}
