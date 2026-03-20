const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// for storing tokens in localStorage
export function setTokens(access: string, refresh: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
}

// for getting tokens from localStorage
export function getAccessToken() {
    if(typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

// for getting refresh token from localStorage
export function getRefreshToken() {
    if(typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}

// for clearing tokens from localStorage
export function clearTokens() {
    if(typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}