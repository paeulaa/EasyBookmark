import BookmarkCard from "./BookmarkCard";
import { Bookmark } from "@/types";

type BookmarkCarouselProps = {
    bookmarks: Bookmark[];
};

// helper function to get the domain from the url, url prettify
function getDomain(url: string) {
    try {
        return new URL(url).hostname;
    } catch {
        return url;
    }
}

export default function BookmarkCarousel({
    bookmarks,
}: BookmarkCarouselProps) {
    return (
        <div className="overflow-x-auto pb-4">
            <div className="flex gap-5">
                {bookmarks.map((bookmark) => (
                    <BookmarkCard
                        key={bookmark.id}
                        title={bookmark.title}
                        url={getDomain(bookmark.url)}
                    />
                ))}
            </div>
        </div>
    );
}