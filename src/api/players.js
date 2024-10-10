const API_URL = 'https://best-ball-api-docker.onrender.com'; // Update with your server URL if deployed

export const fetchPlayerById = async (playerId) => {
    const response = await fetch(`${API_URL}/players${playerId ? `?playerId=${playerId}` : ''}`);
    if (!response.ok) {
        throw new Error('Failed to fetch player');
    }
    return response.json();
};