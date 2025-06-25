// This file contains the functions that interact with the Sleeper API
// to collect data on leagues, users, and rosters.
// 
// Refer to the API docs for more information: https://docs.sleeper.com/#introduction
//

// Collects the users in a given league
async function fetchLeagueUsers(league_id) {
    try {
      const response = await fetch(
        `https://api.sleeper.app/v1/league/${league_id}/users`,
      );
      users = await response.json();
      return users;
    }
    catch (error) {
      console.error('Error:', error);
    }
}

// Collects the rosters in a given league
async function fetchLeagueRosters(league_id) {
    try {
      const response = await fetch(
        `https://api.sleeper.app/v1/league/${league_id}/rosters`,
      );
      return await response.json();
    }
    catch (error) {
      console.error('Error:', error);
    }
}

// Collects all players in the NFL. Unlike the other functions, 
// this data will be written to a file.
function fetchPlayers() {
    fetch("https://api.sleeper.app/v1/players/nfl")
        .then(response => response.json())
        .then(async () => {
            const response = await fetch("https://api.sleeper.app/v1/players/nfl");
            const data = await response.json();
            const jsonData = JSON.stringify(data, null, 2);
            //console.log(jsonData);
            writeFileSync('players.json', jsonData, { flag: 'w' });
        })
        .catch(error => console.error('Error fetching players:', error));
}

module.exports = {
    fetchLeagueUsers,
    fetchLeagueRosters,
    fetchPlayers
};