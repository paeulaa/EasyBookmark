"use client";

import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";
import FolderOverlay from "@/components/FolderOverlay";
import BookmarkCarousel from "@/components/BookmarkCarousel";
import { getFolders, getBookmarks } from "@/lib/api";
import { User, Bookmark, Folder } from "@/types";


export default function DashboardPage() {
    const headerShellRef = useRef<HTMLDivElement>(null);
    const [folderOverlayTopPx, setFolderOverlayTopPx] = useState(72);

    const [selectedFolder, setSelectedFolder] = useState("All");
    const [searchValue, setSearchValue] = useState("");
    const [isFolderOverlayOpen, setIsFolderOverlayOpen] = useState(false);

    const [folders, setFolders] = useState<Folder[]>([]);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    useLayoutEffect(() => {
        const el = headerShellRef.current;
        if (!el) return;

        const sync = () => {
            setFolderOverlayTopPx(el.getBoundingClientRect().height);
        };

        sync();
        const ro = new ResizeObserver(sync);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        async function fetchBookmarks() {
            try {
                const data = await getBookmarks();
                console.log('API bookmarks:', data); // print出來看看data長怎樣
                setBookmarks(data as Bookmark[]);
            } catch (error) {
                console.error('Failed to fetch bookmarks:', error);
            }
        }
        fetchBookmarks();

        async function fetchFolders() {
            try {
                const data = await getFolders();
                console.log('API folders:', data); // print出來看看data長怎樣
                setFolders(data as Folder[]);
            } catch (error) {
                console.error('Failed to fetch folders:', error);
            }
        }
        fetchFolders();
    }, []);

    const filteredBookmarks = useMemo(() => {
        return bookmarks.filter((bookmark) =>
            bookmark.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [bookmarks, searchValue]);

    const folderNames = useMemo(() => {
        return ["All", ...folders.map((folder) => folder.name)];
    }, [folders]);

    function handleOpenProfile() {
        console.log("open profile");
    }

    function handleAddBookmark() {
        console.log("open add bookmark");
    }

    function handleCreateFolder() {
        console.log("create folder");
    }

    function handleFetchChrome() {
        console.log("fetch from chrome");
    }

    function handleOpenGallery() {
        console.log("open gallery");
    }

    return (
        <main className="flex min-h-dvh w-full flex-1 flex-col bg-neutral-50 text-neutral-900">
            {/* Header + folder sheet share one positioning context so the overlay sits under the navbar */}
            <div
                ref={headerShellRef}
                className="relative z-50 shrink-0 bg-white"
            >
                <DashboardHeader
                    currentFolder={selectedFolder}
                    onToggleFolders={() =>
                        setIsFolderOverlayOpen((open) => !open)
                    }
                    onOpenProfile={handleOpenProfile}
                    onAddBookmark={handleAddBookmark}
                />

                <FolderOverlay
                    isOpen={isFolderOverlayOpen}
                    topPx={folderOverlayTopPx}
                    folders={folderNames}
                    selectedFolder={selectedFolder}
                    onClose={() => setIsFolderOverlayOpen(false)}
                    onSelectFolder={setSelectedFolder}
                    onCreateFolder={handleCreateFolder}
                />
            </div>

            <section className="flex min-h-0 flex-1 flex-col px-6 py-6">
                <BookmarkCarousel bookmarks={filteredBookmarks} />
            </section>

            <DashboardFooter
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                onFetchChrome={handleFetchChrome}
                onOpenGallery={handleOpenGallery}
            />
        </main>
    );
}