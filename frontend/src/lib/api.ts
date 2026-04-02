import { getAccessToken } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

// for login request
export async function loginRequest(access_token: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/me/`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get user information");
  }
  return response.json();
}

// GET folders api
export async function getFolders() {
  const response = await fetch(`${API_BASE_URL}/api/folders/`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("getFolders failed:", response.status, errorText);
    throw new Error("Failed to get folders");
  }
  const data = await response.json();
  return data;
}

// POST create folder api
export async function createFolder(name: string, parentId?: number) {
  const response = await fetch(`${API_BASE_URL}/api/folders/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      parentId,
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("createFolder failed:", response.status, errorText);
    throw new Error("Failed to create folder");
  }
  const data = await response.json();
  return data;
}

// GET bookmarks api
export async function getBookmarks(folderId?: number) {
  // 這個api負責拿bookmarks, 而bookmarks資料可能帶folderId, 也可能沒有
  const endpoint = folderId // so endpoint可以有folderId, 也可以沒有
    ? `/api/bookmarks/?folder=${folderId}` // 如果folderId有值, 就是/api/bookmarks/?folder=3
    : "/api/bookmarks/"; // 如果folderId沒有值, 就是/api/bookmarks/
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    // 這邊是把 base url 跟 endpoint 接起來
    // 並送出http request: http://127.0.0.1:8000/api/bookmarks/ or http://127.0.0.1:8000/api/bookmarks/?folder=3
    headers: {
      // 因為後端有做isAuthenticated, 所以需要帶token, 格式是：Authorization: Bearer xxxxxxxxx
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  if (!response.ok) {
    // 如果response不是ok, 就是有錯誤！注意這邊response是fetch的一整包得東西
    // response包括：
    /* Response {
            ok: true, 這次 request 成功還是失敗
            status: 200, status code 是多少（200、401、404…）
            headers: ..., headers(OAuth2 token, JWT token, etc.)
            body: ... body（真正資料內容, 一般是json格式）
        } */
    const errorText = await response.text();
    console.error("getBookmarks failed:", response.status, errorText);
    throw new Error("Failed to get bookmarks");
  }
  const data = await response.json(); // 把response的body轉換成json格式, 方便待會frontend獲取body資料
  return data;
}
// POST create bookmark api
export async function createBookmark(bookmarkData: {
  title: string,
  url: string,
  folder: number,
  note?: string,
}) {
  const response = await fetch(`${API_BASE_URL}/api/bookmarks/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookmarkData),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("createBookmark failed:", response.status, errorText);
    throw new Error("Failed to create bookmark");
  }
  const data = await response.json();
  console.log("createBookmark success:", data);
  return data;
}

export { API_BASE_URL };
