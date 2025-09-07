import React, { useState } from 'react';
import { User, UserAndRoster } from '@/types/types';
import { fetchRostersByUserId } from '@/api/rosters';
import RosterModal from './rosterModal';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

const StandingCol: React.FC<{ standings: User[] }> = ({ standings }) => {
  const [selectedRoster, setSelectedRoster] = useState<UserAndRoster | null>(null);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const hasOvrRank = standings.some((standing) => standing.ovrRank !== null);

  const sortedStandings = standings.sort((a, b) => {
    if (a.ovrRank == null) return 1;
    if (b.ovrRank == null) return -1;
    return a.ovrRank - b.ovrRank;
  });

  const handleViewRoster = async (userId: string) => {
    setModalOpen(true); // open immediately
    setLoadingUserId(userId); // show loading spinner

    try {
      const roster = await fetchRostersByUserId(userId);
      setSelectedRoster(roster);
    } catch (error) {
      console.error('Error loading roster:', error);
    } finally {
      setLoadingUserId(null); // stop loading
    }
  };

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
          {sortedStandings.map((standing, index) => {
            const isLoading = loadingUserId === standing.userId;
            return (
              <TableRow
                key={index}
                className={`cursor-pointer transition-colors ${
                  [1, 2, 3].includes(standing.leagueRank ?? 0)
                    ? 'bg-green-200 hover:bg-green-300'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => !isLoading && handleViewRoster(standing.userId)}
              >
                {standing.ovrRank && <TableCell>{standing.ovrRank}</TableCell>}
                {standing.leagueRank && <TableCell>{standing.leagueRank}</TableCell>}
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={
                        `https://sleepercdn.com/avatars/${standing.userAvatar}` ||
                        'https://sleepercdn.com/avatars/cc12ec49965eb7856f84d71cf85306af'
                      }
                      alt={`${standing.displayName}'s avatar`}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        marginRight: '10px',
                      }}
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://sleepercdn.com/avatars/cc12ec49965eb7856f84d71cf85306af';
                      }}
                    />
                    {isLoading ? (
                      <Loader2 className="animate-spin h-5 w-5 text-gray-600" />
                    ) : (
                      standing.displayName
                    )}
                  </div>
                </TableCell>
                <TableCell>{standing.totalPoints}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <RosterModal
        user={selectedRoster}
        open={modalOpen}
        loading={!!loadingUserId}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setSelectedRoster(null);
        }}
      />
    </div>
  );
};

export default StandingCol;