const API_URL = 'https://best-ball-api-docker.onrender.com'; // Update with your server URL if deployed

// ✅ Fetch all weekly scores
export const fetchAllWeeklyScores = async () => {
  const response = await fetch(`${API_URL}/weeklyScores`);
  if (!response.ok) {
    throw new Error('Failed to fetch weekly scores');
  }
  return response.json();
};

// ✅ Fetch scores by leagueId
export const fetchWeeklyScoresByLeague = async (leagueId) => {
  const response = await fetch(
    `${API_URL}/weeklyScores${leagueId ? `?leagueId=${leagueId}` : ''}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weekly scores by leagueId');
  }
  return response.json();
};

// ✅ Fetch scores by leagueId + rosterId
export const fetchWeeklyScoresByLeagueAndRoster = async (
  leagueId,
  rosterId
) => {
  const response = await fetch(
    `${API_URL}/weeklyScores?leagueId=${leagueId}&rosterId=${rosterId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weekly scores by league and roster');
  }
  return response.json();
};

// Fetch scores by leagueId + rosterId + week
export const fetchWeeklyScoresByWeek = async (
  leagueId,
  rosterId,
  week
) => {
  const response = await fetch(
    `${API_URL}/weeklyScores?leagueId=${leagueId}&rosterId=${rosterId}&week=${week}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weekly scores by week');
  }
  return response.json();
};