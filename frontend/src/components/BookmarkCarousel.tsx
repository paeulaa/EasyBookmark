import BookmarkCard from "./BookmarkCard";

type Bookmark = {
    id: number;
    title: string;
    domain: string;
};

type BookmarkCarouselProps = {
    bookmarks: Bookmark[];
};

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
                        domain={bookmark.domain}
                    />
                ))}
            </div>
        </div>
    );
}