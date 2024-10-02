import { fetchUsersByLeagueID } from './users'
import { fetchPlayerById } from './players'

const API_URL = 'https://best-ball-api-8nrw.onrender.com'; // Update with your server URL if deployed

export const fetchRostersByLeagueId = async (leagueId) => {
    try {
        // Step 1: Fetch users with rosters by league ID
        const users = await fetchUsersByLeagueID(leagueId);

        // Step 2: Loop through each user to fetch detailed player information for their roster
        const usersWithDetailedRosters = await Promise.all(users.map(async (user) => {
            // If the user has a roster with player IDs, fetch detailed info for each player
            const rosterWithDetails = await Promise.all(user.roster.map(async (playerId) => {
                const playerInfo = await fetchPlayerById(playerId);
                return playerInfo; // Return detailed player info
            }));

            // Add the detailed roster information to the user object
            return {
                ...user,
                detailedRoster: rosterWithDetails // New field with detailed player info
            };
        }));

        // Return the users with their detailed rosters
        return usersWithDetailedRosters;
    } catch (error) {
        console.error('Error fetching league rosters with player details:', error);
        throw error;
    }
};