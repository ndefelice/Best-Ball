import React, { useState } from 'react';
import { User, UserAndRoster } from '@/types/types';
import { fetchRostersByUserId } from '@/api/rosters';
import WeeklyRosterModal from './weeklyRosterModal';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

interface WeeklyStandingColProps {
  standings: User[];
  week: number;
}

const WeeklyStandingCol: React.FC<WeeklyStandingColProps> = ({ standings, week }) => {
  const [selectedRoster, setSelectedRoster] = useState<UserAndRoster | null>(null);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const hasOvrRank = standings.some((standing) => standing.ovrRank !== null);

  // Sort by weekly points descending
  const sortedStandings = [...standings].sort((a, b) => {
    const aPoints = (a as any)[`week${week}Pts`] ?? 0;
    const bPoints = (b as any)[`week${week}Pts`] ?? 0;
    return bPoints - aPoints;
  });

  const handleViewRoster = async (userId: string) => {
    setModalOpen(true);
    setLoadingUserId(userId);

    try {
      const roster = await fetchRostersByUserId(userId);
      setSelectedRoster(roster);
    } catch (error) {
      console.error('Error loading roster:', error);
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {hasOvrRank && <TableHead>Rank</TableHead>}
            <TableHead>Team</TableHead>
            <TableHead>Week {week} Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStandings.map((standing, index) => {
            const isLoading = loadingUserId === standing.userId;
            return (
              <TableRow
                key={index}
                className={`cursor-pointer transition-colors ${
                  index === 0
                    ? 'bg-yellow-300 hover:bg-yellow-400' // Gold
                    : index === 1
                    ? 'bg-slate-400 hover:bg-gray-400' // Silver
                    : index === 2
                    ? 'bg-amber-600 hover:bg-amber-800' // Bronze
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => !isLoading && handleViewRoster(standing.userId)}
              >
                {hasOvrRank && <TableCell>{standing.ovrRank}</TableCell>}
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
                <TableCell>{(standing as any)[`week${week}Pts`] ?? 0}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <WeeklyRosterModal
        user={selectedRoster}
        open={modalOpen}
        loading={!!loadingUserId}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setSelectedRoster(null);
        }}
        week={week}
      />
    </div>
  );
};

export default WeeklyStandingCol;