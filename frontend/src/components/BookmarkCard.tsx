import Image from "next/image";

type BookmarkCardProps = {
  id: number;
  title: string;
  url: string;
  onDeleteBookmark: (id: number) => void;
};

/**
 * Preview image URL. In Next.js, paths starting with `/` are served from `public/`.
 * Example: `/devMock/mock1.jpg` → file `frontend/public/devMock/mock1.jpg`.
 * Until you add those JPGs, we rotate built-in SVGs from `public/` so previews still show.
 */
function getMockImage(id: number) {
  const images = [
    "/devMock/mock1.jpg",
    "/devMock/mock2.jpg",
    "/devMock/mock3.jpg",
    "/devMock/mock4.jpg",
    "/devMock/mock5.jpg",
    "/devMock/mock6.jpg",
  ];

  const index = id % images.length;
  return images[index];
}
export default function BookmarkCard({
  title,
  url,
  id,
  onDeleteBookmark,
}: BookmarkCardProps) {
  return (
    <article className="h-auto w-[400px] min-w-[300px] shrink-0 overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm flex flex-col">

      {/* 上半區：固定比例預覽圖（用 next/image 取代 img 以符合 ESLint / 優化載入） */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-neutral-200">
        <Image
          src={getMockImage(id)}
          alt={`Bookmark preview for ${title}`}
          fill
          className="object-cover"
          sizes="300px"
          draggable={false}
        />
      </div>

      {/* 下半區：固定內容 */}
      <div className="p-5">
        <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm text-neutral-500">{url}</p>
        <button onClick={() => onDeleteBookmark(id)}>Delete</button>
      </div>

    </article>
  );
}
