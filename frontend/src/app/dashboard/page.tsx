"use client";

import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";
import FolderOverlay from "@/components/FolderOverlay";
import BookmarkCarousel from "@/components/BookmarkCarousel";
import { getFolders, getBookmarks, createFolder, createBookmark, deleteBookmark, deleteFolder } from "@/lib/api";
import { Bookmark, Folder } from "@/types";
import AddBookmarkModel from "@/components/AddBookmarkModel";
import SearchOverlay from "@/components/SearchOverlay";

export default function DashboardPage() {
    const headerShellRef = useRef<HTMLDivElement>(null);
    const [folderOverlayTopPx, setFolderOverlayTopPx] = useState(72);

    const [selectedFolder, setSelectedFolder] = useState("All");
    const [searchValue, setSearchValue] = useState("");
    const [isFolderOverlayOpen, setIsFolderOverlayOpen] = useState(false);
    const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

    const [folders, setFolders] = useState<Folder[]>([]);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [addBookmarkModel, setAddBookmarkModel] = useState(false);

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
                console.log("API bookmarks:", data); // print出來看看data長怎樣
                setBookmarks(data as Bookmark[]);
            } catch (error) {
                console.error("Failed to fetch bookmarks:", error);
            }
        }
        fetchBookmarks();

        async function fetchFolders() {
            try {
                const data = await getFolders();
                console.log("API folders:", data); // print出來看看data長怎樣
                setFolders(data as Folder[]);
            } catch (error) {
                console.error("Failed to fetch folders:", error);
            }
        }
        fetchFolders();
    }, []);

    const filteredBookmarks = useMemo(() => {
        return bookmarks.filter((bookmark) => {
            const matchesSearch = bookmark.title.
                toLowerCase().
                includes(searchValue.toLowerCase());
            const matchesFolder = selectedFolder === 'All' ||
                bookmark.folder?.name === selectedFolder;

            return matchesSearch && matchesFolder;
        });
    }, [bookmarks, searchValue, selectedFolder]);

    // const folderNames = useMemo(() => {
    //     return ["All", ...folders.map((folder) => folder.name)];
    // }, [folders]);

    function handleOpenProfile() {
        console.log("open profile");
    }

    function handleAddBookmark() {
        console.log("open add bookmark");
        if (selectedFolder === "All") {
            alert("Please select a folder first");
            return;
        }
        setAddBookmarkModel(true);
    }

    async function handleCreateBookmark(data: {
        title: string,
        url: string,
        note?: string,
    }) {
        const matchedFolder = folders.find(
            (folder) => folder.name === selectedFolder
        );

        if (!matchedFolder) {
            alert("No valid folder selected");
            return;
        }

        try {
            const newBookmark = await createBookmark({
                ...data,
                folder: matchedFolder.id,
            });
            const normalizedBookmark = {
                ...newBookmark,
                folder: matchedFolder, // ✅ 用完整 folder object 補回去
            };
            setBookmarks((prev) => [...prev, normalizedBookmark]);
            setAddBookmarkModel(false); // ✅ 成功後關 modal
        } catch (error) {
            console.error("Failed to create bookmark:", error);
        }
    }

    async function handleCreateFolder(name: string) {
        console.log("Creating folder:", name);

        const exists = folders.some(
            (folder) => folder.name.trim().toLowerCase() === name.trim().toLowerCase(),
        );

        if (exists) {
            alert("Folder name already exists");
            return;
        }

        try {
            const newFolder = await createFolder(name);
            console.log("Created folder:", newFolder);

            // 更新 UI（關鍵）
            setFolders((prev) => [...prev, newFolder]);
        } catch (error) {
            console.error("Failed to create folder:", error);
        }
    }

    async function handleDeleteBookmark(bookmarkId: number) {
        try {
            await deleteBookmark(bookmarkId);
            setBookmarks((prev) =>
                prev.filter((bookmark) => bookmark.id !== bookmarkId)
            );
        } catch (error) {
            console.error("Failed to delete bookmark:", error);
        }
    }

    async function handleDeleteFolder(folderId: number) {
        try {
            await deleteFolder(folderId);

            const deletedFolder = folders.find((folder) => folder.id === folderId);

            setFolders((prev) => prev.filter((folder) => folder.id !== folderId));

            // 如果現在正在看被刪掉的 folder，就退回 All
            if (deletedFolder && selectedFolder === deletedFolder.name) {
                setSelectedFolder("All");
            }
        } catch (error) {
            console.error("Failed to delete folder:", error);
        }
    }

    function handleFetchChrome() {
        console.log("fetch from chrome");
    }

    function handleOpenGallery() {
        console.log("open gallery");
    }

    function handleOpenSearch() {
        console.log("open search");
        setIsSearchOverlayOpen(true);
    }

    return (
        <main className="flex min-h-dvh w-full flex-1 flex-col bg-neutral-50 text-neutral-900">
            {/* Header + folder sheet share one positioning context so the overlay sits under the navbar */}
            <div ref={headerShellRef} className="relative z-50 shrink-0 bg-white">
                <DashboardHeader
                    currentFolder={selectedFolder}
                    onToggleFolders={() => setIsFolderOverlayOpen((open) => !open)}
                    onOpenProfile={handleOpenProfile}
                    onAddBookmark={handleAddBookmark}
                />

                <FolderOverlay
                    isOpen={isFolderOverlayOpen}
                    topPx={folderOverlayTopPx}
                    folders={folders}
                    selectedFolder={selectedFolder}
                    onClose={() => setIsFolderOverlayOpen(false)}
                    onSelectFolder={setSelectedFolder}
                    onCreateFolder={handleCreateFolder}
                    onDeleteFolder={handleDeleteFolder}
                />
            </div>

            <AddBookmarkModel
                isOpen={addBookmarkModel}
                onClose={() => setAddBookmarkModel(false)}
                onSubmit={handleCreateBookmark}
            />

            <section className="flex min-h-0 flex-1 flex-col px-6 py-6">
                <BookmarkCarousel
                    bookmarks={filteredBookmarks}
                    onDeleteBookmark={handleDeleteBookmark}
                />
            </section>

            <DashboardFooter
                onFetchChrome={handleFetchChrome}
                onOpenGallery={handleOpenGallery}
                onOpenSearch={handleOpenSearch}
            />

            <SearchOverlay
                isOpen={isSearchOverlayOpen}
                topPx={folderOverlayTopPx}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                results={filteredBookmarks}
                onClose={() => setIsSearchOverlayOpen(false)}
            />
        </main>
    );
}
