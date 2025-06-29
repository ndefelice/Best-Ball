// Calls the Sleeper API to collect each team's owner ID and
// total points for a given league
async function fetchTeamPoints(league_id) {
  try {
    const response = await fetch(
      `https://api.sleeper.app/v1/league/${league_id}/rosters`,
    );
    const rosters = await response.json();
    const teamPoints = {};

    rosters.forEach((roster) => {
      const teamId = roster.owner_id;
      const totalPoints = roster.settings.fpts;

      teamPoints[teamId] = totalPoints;
    });
    return teamPoints;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Calls the Sleeper API to collect each team's owner ID and
// diaplay name for a given league
async function fetchLeagueUsers(league_id) {
  try {
    const response = await fetch(
      `https://api.sleeper.app/v1/league/${league_id}/users`,
    );
    const users = await response.json();
    const user_info = {};

    users.forEach((user) => {
      const userId = user.user_id;
      const displayName = user.display_name;
      const userAvatar = user.avatar;

      // if we want to call for full image remove /thumbs
      const userAvatarUrl = userAvatar ? `https://sleepercdn.com/avatars/thumbs/${userAvatar}` : null;

      user_info[userId] = {
        displayName: displayName,
        avatarUrl: userAvatarUrl,
      };
    });
    return user_info;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Collect the team points and display name, connect the data with
// the owner ID, and sort the data by total points to create the standings.

async function fetchLeagueStandings(league_id) {
  const teamPoints = await fetchTeamPoints(league_id);
  const user_info = await fetchLeagueUsers(league_id);

  return Promise.all([teamPoints, user_info]).then((values) => {
    const teamPoints = values[0];
    const user_info = values[1];
    const standings = [];

    for (const [teamId, totalPoints] of Object.entries(teamPoints)) {
      const displayName = user_info[teamId]?.displayName;
      const userAvatar = user_info[teamId]?.avatarUrl;
      const userId = teamId;
      const leagueId = league_id;
      standings.push({ displayName, userAvatar, totalPoints, leagueId, userId });
    }

    standings.sort((a, b) => b.totalPoints - a.totalPoints);

    // Add league rank to each team in standings
    standings.forEach((team, index) => {
      team.leagueRank = index + 1;
    });

    return standings;
  });
}


async function fetchDraftResults(draft_id) {
    try {
        const response = await fetch(
        `https://api.sleeper.app/v1/draft/${draft_id}/picks`,
        );
        const draftResults = await response.json();
        console.log(draftResults);
        return draftResults;
    } catch (error) {
        console.error('Error:', error);
    }
}


async function fetchLeagueRosters(league_id) {
    try {
        const response = await fetch(
        `https://api.sleeper.app/v1/league/${league_id}/rosters`,
        );
        const rosters = await response.json();
        console.log(rosters);
        return rosters;
    } catch (error) {
        console.error('Error:', error);
    }
}

export { fetchLeagueStandings, fetchLeagueRosters };