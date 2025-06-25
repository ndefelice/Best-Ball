// Get all NFL players from Sleeper API and write to players.json file

const { writeFileSync } = require('fs');

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

function main() {
    fetchPlayers();
}

main()