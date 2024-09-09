function calculateOverallStandings(league1, league2, league3) {
    return Promise.all([league1, league2, league3]).then((values) => {
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

  export default calculateOverallStandings;