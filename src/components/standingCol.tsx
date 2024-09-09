import React from 'react';
import { Standing } from '@/types/types'; // Replace "@/path/to/Standing" with the actual path to the Standing type

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const StandingCol: React.FC<{ standings: Standing[] }> = ({ standings }) => {
  const hasOvrRank = standings.find((standing) => standing.ovrRank) != null;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {hasOvrRank && <TableHead>Rank</TableHead>}
            <TableHead>League Rank</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.map((standing: Standing, index: number) => (
            <TableRow
              key={index}
              className={
                standing.leagueRank === 1 || standing.leagueRank === 2
                  ? 'bg-green-200'
                  : 'bg-gray-200'
              }
            >
              {standing.ovrRank && <TableCell>{standing.ovrRank}</TableCell>}
              {standing.leagueRank && (
                <TableCell>{standing.leagueRank}</TableCell>
              )}
              <TableCell>{standing.displayName}</TableCell>
              <TableCell>{standing.totalPoints}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StandingCol;
