const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

// for login request
export async function loginRequest(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if(!response.ok) {
        throw new Error('Failed to login');
    }

    return response.json();
}

export { API_BASE_URL };