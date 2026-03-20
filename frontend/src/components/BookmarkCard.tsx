type BookmarkCardProps = {
    title: string;
    domain: string;
};

export default function BookmarkCard({
    title,
    domain,
}: BookmarkCardProps) {
    return (
        <article className="w-[260px] shrink-0 overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
            <div className="h-[320px] bg-neutral-200" />
            <div className="p-5">
                <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{domain}</p>
            </div>
        </article>
    );
}