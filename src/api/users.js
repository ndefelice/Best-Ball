const API_URL = 'https://best-ball-api-docker.onrender.com'; // Update with your server URL if deployed

export const fetchAllUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

export const fetchUsersByLeagueID = async (leagueId) => {
    const response = await fetch(`${API_URL}/users${leagueId ? `?leagueId=${leagueId}` : ''}`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

export const fetchUserByUserId = async (userId) => {
    const response = await fetch(`${API_URL}/users?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
};