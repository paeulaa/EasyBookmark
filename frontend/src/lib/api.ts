import { getAccessToken } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

// for login request
export async function loginRequest(access_token: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/me/`, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    });
    if(!response.ok) {
        throw new Error('Failed to get user information');
    }
    return response.json();
}

export async function getFolders() {
    return fetch(`${API_BASE_URL}/api/folders/`, {
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
        }
    });
}

export async function getBookmarks(folderId?: number) {
    const endpoint = folderId
      ? `/api/bookmarks/?folder=${folderId}`
      : "/api/bookmarks/";
    return fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
        }
    });
}

export { API_BASE_URL };
