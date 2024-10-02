const API_URL = 'https://best-ball-api-8nrw.onrender.com'; // Update with your server URL if deployed

export const fetchDraftById = async (leagueId) => {
    try {
        const response = await fetch(`${API_URL}/draft${leagueId ? `?leagueId=${leagueId}` : ''}`);
        if (!leagueId) {
            throw new Error('leagueId is required');
        }
        if (!response.ok) {
            throw new Error(`Server Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched draft data: ", data);
        return data;
    } catch (err) {
        console.error("Error fetching draft: ", err.message); // Add this to see more details
        throw err;
    }
};