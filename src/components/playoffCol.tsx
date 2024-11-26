import React from 'react';
import { PlayoffUser } from '@/types/types'; // Import PlayoffUser type

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const PlayoffCol: React.FC<{ standings: PlayoffUser[] }> = ({ standings }) => {
  // Check if there is at least one ovrRank in the standings
  const hasOvrRank = standings.some((standing) => standing.ovrRank !== null);

  // Sort standings by ovrRank (ascending order), handling undefined or null values
  const sortedStandings = standings.sort((a, b) => {
    if (a.ovrRank === undefined || a.ovrRank === null) return 1; // Place null/undefined at the end
    if (b.ovrRank === undefined || b.ovrRank === null) return -1;
    return a.ovrRank - b.ovrRank; // Sort in ascending order
  });

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {hasOvrRank && <TableHead>Rank</TableHead>}
            <TableHead>Team</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Eliminated</TableHead>
            <TableHead>Competing for 3rd</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStandings.map((standing: PlayoffUser, index: number) => (
            <TableRow
              key={index}
              className={
                standing.eliminated || standing.competing_for_third
                  ? 'bg-red-200' // Highlight eliminated or competing for 3rd in red
                  : 'bg-gray-200'
              }
            >
              {standing.ovrRank !== undefined && standing.ovrRank !== null && (
                <TableCell>{standing.ovrRank}</TableCell>
              )}
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={standing.userAvatar || 'https://sleepercdn.com/avatars/cc12ec49965eb7856f84d71cf85306af'}
                    alt={`${standing.displayName}'s avatar`}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://sleepercdn.com/avatars/cc12ec49965eb7856f84d71cf85306af'; // Placeholder
                    }}
                  />
                  {standing.displayName}
                </div>
              </TableCell>
              <TableCell>{standing.totalPoints}</TableCell>
              <TableCell>{standing.eliminated ? 'Yes' : 'No'}</TableCell>
              <TableCell>{standing.competing_for_third ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlayoffCol;
