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

  const renderTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Team</TableHead>
          <TableHead>Points</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
        {/* First Round */}
        <div className="w-full">
            <h2 className="text-center font-bold mb-2">Quarter Finals</h2>
            {renderTable()}
        </div>

        {/* Second Round */}
        <div className="w-full">
            <h2 className="text-center font-bold mb-2">Semi Finals</h2>
            <div className="text-center text-gray-500 font-medium">TBD</div>
        </div>

        {/* Third Round */}
        {/* Championship */}
        <div className="w-1/2">
            <h2 className="text-center font-bold mb-2">Championship</h2>
            <div className="text-center text-gray-500 font-medium">TBD</div>
        </div>
            {/* Consolation Bracket */}
        <div className="w-1/2">
            <h3 className="text-center font-semibold mb-2">3rd Place</h3>
            <div className="text-center text-gray-500 font-medium">TBD</div>
        </div>
    </div>

  );
};

export default PlayoffCol;
