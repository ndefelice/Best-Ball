const API_URL = 'https://best-ball-api-docker.onrender.com'; // Update with your server URL if deployed

export const fetchAllPlayoffUsers = async () => {
    const response = await fetch(`${API_URL}/playoffs?week=1`);
    if (!response.ok) {
        throw new Error('Failed to fetch playoff users');
    }
    return response.json();
};