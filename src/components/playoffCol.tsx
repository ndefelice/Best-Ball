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
  // Filtered standings for each round
  const quarterFinalsUsers = standings.filter((standing) => standing.week === 1);
  const semiFinalsUsers = standings.filter((standing) => standing.week === 2);
  const championshipUsers = standings.filter(
    (standing) => standing.week === 3 && !standing.competing_for_third
  );
  const thirdPlaceUsers = standings.filter(
    (standing) => standing.week === 3 && standing.competing_for_third
  );

  // Sort each filtered array by totalPoints (descending order)
  const sortByPoints = (users: PlayoffUser[]) =>
    users.sort((a, b) => {
      if (a.totalPoints === undefined || a.totalPoints === null) return 1; // Place null/undefined at the end
      if (b.totalPoints === undefined || b.totalPoints === null) return -1;
      return b.totalPoints - a.totalPoints; // Sort in descending order
    });

  const renderTable = (users: PlayoffUser[]) => (
    <Table className="mb-10">
      <TableHeader>
        <TableRow>
          <TableHead>Team</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortByPoints(users).map((standing: PlayoffUser, index: number) => (
          <TableRow
            key={index}
            className={
              standing.eliminated
                ? 'bg-red-200' // Highlight eliminated teams in red
                : standing.competing_for_third
                ? 'bg-yellow-200' // Highlight teams competing for 3rd in yellow
                : 'bg-green-200' // Highlight active teams still in the playoffs in green
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
      {/* Championship */}
      <div className="w-1/2">
        <h2 className="text-center font-bold mb-4">Championship</h2>
        <h1 className="text-center font-bold mb-2 text-gray-500">TBD</h1>

      </div>

      {/* Consolation Bracket */}
      <div className="w-1/2">
        <h3 className="text-center font-semibold mb-4">3rd Place</h3>
        <h1 className="text-center font-bold mb-8 text-gray-500">TBD</h1>
      </div>

      {/* Semi Finals */}
      <div className="w-full">
        <h2 className="text-center font-bold mb-2">Semi Finals</h2>
        {renderTable(semiFinalsUsers)}
      </div>

      {/* Quarter Finals */}
      <div className="w-full">
        <h2 className="text-center font-bold mb-2">Quarter Finals</h2>
        {renderTable(quarterFinalsUsers)}
      </div>
    </div>
  );
};

export default PlayoffCol;