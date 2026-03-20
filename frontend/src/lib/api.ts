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

export { API_BASE_URL };