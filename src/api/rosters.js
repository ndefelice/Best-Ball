import { fetchUsersByLeagueID, fetchUserByUserId } from './users';
import { fetchPlayerById } from './players';
import { fetchWeeklyScoresByWeek } from './weeklyScores';

const MAX_WEEKS = 17;

// Map weekly scores to top-level week1, week2, etc.
const mapWeeklyPoints = (weeklyScores, playerId) => {
  const points = {};
  weeklyScores.forEach(score => {
    points[`week${score.week}`] = score.players_points[playerId] ?? 0;
  });
  return points;
};

// Fetch rosters by league ID (flattened)
export const fetchRostersByLeagueId = async (leagueId) => {
  try {
    const users = await fetchUsersByLeagueID(leagueId);

    const usersWithDetailedRosters = await Promise.all(
      users.map(async (user) => {
        const rosterWithDetails = await Promise.all(
          user.roster.map(async (playerId) => {
            const playerInfo = await fetchPlayerById(playerId);

            const weeklyScores = await Promise.all(
              Array.from({ length: MAX_WEEKS }, (_, i) =>
                fetchWeeklyScoresByWeek(leagueId, user.rosterId, i + 1)
              )
            );

            const weeklyPoints = mapWeeklyPoints(
              weeklyScores.flat(),
              playerId
            );

            return {
              ...playerInfo,
              ...weeklyPoints, // week1, week2, etc.
            };
          })
        );

        return {
          ...user,
          detailedRoster: rosterWithDetails, // ✅ flat array, no extra nesting
        };
      })
    );

    return usersWithDetailedRosters;
  } catch (error) {
    console.error('Error fetching league rosters with weekly points:', error);
    throw error;
  }
};

// Fetch roster by single user ID (flattened)
export const fetchRostersByUserId = async (userId) => {
  try {
    const user = await fetchUserByUserId(userId);

    const rosterWithDetails = await Promise.all(
      user.roster.map(async (playerId) => {
        const playerInfo = await fetchPlayerById(playerId);

        const weeklyScores = await Promise.all(
          Array.from({ length: MAX_WEEKS }, (_, i) =>
            fetchWeeklyScoresByWeek(user.leagueId, user.rosterId, i + 1)
          )
        );

        const weeklyPoints = mapWeeklyPoints(
          weeklyScores.flat(),
          playerId
        );

        return {
          ...playerInfo,
          ...weeklyPoints, // week1, week2, etc.
        };
      })
    );

    return {
      ...user,
      detailedRoster: rosterWithDetails, // ✅ flat array, no extra nesting
    };
  } catch (error) {
    console.error('Error fetching user roster with weekly points:', error);
    throw error;
  }
};