// Calls the Sleeper API to collect each team's owner ID and 
// total points for a given league
async function fetchTeamPoints(league_id) {
    try {
        const response = await fetch(`https://api.sleeper.app/v1/league/${league_id}/rosters`);
        const rosters = await response.json();
        const teamPoints = {};

        rosters.forEach(roster => {
            const teamId = roster.owner_id;
            const totalPoints = roster.settings.fpts;

            teamPoints[teamId] = totalPoints;
        });
        return teamPoints;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Calls the Sleeper API to collect each team's owner ID and 
// diaplay name for a given league
async function fetchLeagueUsers(league_id) {
    try {
        const response = await fetch(`https://api.sleeper.app/v1/league/${league_id}/users`);
        const users = await response.json();
        const user_info = {};

        users.forEach(user => {
            const userId = user.user_id;
            const displayName = user.display_name;

            user_info[userId] = displayName;
        });
        return user_info;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Collect the team points and display name, connect the data with
// the owner ID, and sort the data by total points to create the standings.
async function fetchStandings(league_id) {
    const teamPoints = fetchTeamPoints(league_id);
    const user_info = fetchLeagueUsers(league_id);

    return Promise.all([teamPoints, user_info]).then(values => {
        const teamPoints = values[0];
        const user_info = values[1];
        const standings = [];

        for (const [teamId, totalPoints] of Object.entries(teamPoints)) {
            const displayName = user_info[teamId];
            standings.push({ displayName, totalPoints });
        }

        standings.sort((a, b) => b.totalPoints - a.totalPoints);

        // Add league rank to each team in standings
        standings.forEach((team, index) => {
            team.leagueRank = index + 1;
        });

        return standings;
    });
}

function calculateOverallStandings(league1, league2, league3) {
    return Promise.all([league1, league2, league3]).then(values => {
        const overallStandings = values.flat();
        overallStandings.sort((a, b) => b.totalPoints - a.totalPoints);

        // Add overall rank to each team in overall standings
        overallStandings.forEach((team, index) => {
            team.ovrRank = index + 1;
        });

        console.log(overallStandings);
        return overallStandings;
    });
}

// const standings = calculateOverallStandings(
//     fetchStandings("1129049799606558720"),
//     fetchStandings("1129055384385323008"), 
//     fetchStandings("1129055515994148864")
// );
// console.log(standings);
export { fetchStandings, calculateOverallStandings };