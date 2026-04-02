import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BookmarkCard from "./BookmarkCard";
import { Bookmark } from "@/types";

type BookmarkCarouselProps = {
  bookmarks: Bookmark[];
  onDeleteBookmark: (bookmarkId: number) => void;
};

function getDomain(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function BookmarkCarousel({
  bookmarks,
  onDeleteBookmark,
}: BookmarkCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = 400;
  const CARD_HEIGHT = 520;

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (!viewportRef.current) return;
      setViewportWidth(viewportRef.current.offsetWidth);
    };

    updateWidth();

    const ro = new ResizeObserver(updateWidth);
    if (viewportRef.current) ro.observe(viewportRef.current);

    return () => ro.disconnect();
  }, []);

  return (
    <div>
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        style={{ height: CARD_HEIGHT }}
      >
        {bookmarks.map((bookmark, index) => {
          const distance = index - activeIndex;

          const LEFT_RAIL_WIDTH = 84;
          const LEFT_STEP = 30;

          const MAIN_X = 120;
          const RIGHT_PEEK_OFFSET = 100;

          let x = 0;
          let width = CARD_WIDTH;

          // 👉 左邊 rail
          if (distance < 0) {
            const previousOrder = activeIndex - 1 - index;

            width = LEFT_RAIL_WIDTH;
            x = MAIN_X - LEFT_RAIL_WIDTH - previousOrder * LEFT_STEP;
          }

          // 👉 主卡
          if (distance === 0) {
            width = CARD_WIDTH;
            x = MAIN_X;
          }

          // 👉 右邊 peek（只留前兩張）
          if (distance > 0) {
            width = CARD_WIDTH;
            x = MAIN_X + CARD_WIDTH + (distance - 1) * RIGHT_PEEK_OFFSET;
          }

          return (
            <motion.div
              key={bookmark.id}
              className="absolute top-0 overflow-hidden rounded-[28px]"
              animate={{ x, width }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={() => setActiveIndex(index)}
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
    </div>
  );
}