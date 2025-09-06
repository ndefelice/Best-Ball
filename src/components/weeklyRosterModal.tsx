'use client';
import React from 'react';
import { UserAndRoster } from '@/types/types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Tailwind classes based on player position
const getPositionClass = (position: string) => {
  switch (position) {
    case 'RB': return 'bg-green-200';
    case 'WR': return 'bg-blue-200';
    case 'QB': return 'bg-red-200';
    case 'TE': return 'bg-orange-200';
    default: return 'bg-gray-100';
  }
};

interface Player {
  playerId: string;
  playerName: string;
  team?: string;
  position: string;
  status: string;
  week1?: number;
  week2?: number;
  week3?: number;
  week4?: number;
  week5?: number;
  week6?: number;
  week7?: number;
  week8?: number;
  week9?: number;
  week10?: number;
  week11?: number;
  week12?: number;
  week13?: number;
  week14?: number;
  week15?: number;
  week16?: number;
  week17?: number;
}

interface RosterModalProps {
  user: UserAndRoster;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  week: number; // ✅ now always passed
}

type LineupSlot = 'QB' | 'RB' | 'WR' | 'TE' | 'FLEX' | 'BE';

const WeeklyRosterModal: React.FC<RosterModalProps> = ({
  user,
  open,
  onOpenChange,
  week,
}) => {
  // Build the week key dynamically
  const weekKey = `week${week}` as keyof Player;

  // Flatten detailedRoster
  const flattenedRoster: Player[] = (user.detailedRoster ?? []).map((item) => ({
    ...(item as any)[0], // extract nested player
    week1: item.week1,
    week2: item.week2,
    week3: item.week3,
    week4: item.week4,
    week5: item.week5,
    week6: item.week6,
    week7: item.week7,
    week8: item.week8,
    week9: item.week9,
    week10: item.week10,
    week11: item.week11,
    week12: item.week12,
    week13: item.week13,
    week14: item.week14,
    week15: item.week15,
    week16: item.week16,
    week17: item.week17,
  }));

  const sortedPlayers = flattenedRoster.sort((a, b) =>
    (a.position ?? '').localeCompare(b.position ?? '')
  );

  const computeLineup = (players: Player[], week: keyof Player) => {
    const safeScore = (p: Player) => Number(p[week] ?? 0);

    const QBs = players.filter(p => p.position === 'QB').sort((a,b) => safeScore(b) - safeScore(a));
    const RBs = players.filter(p => p.position === 'RB').sort((a,b) => safeScore(b) - safeScore(a));
    const WRs = players.filter(p => p.position === 'WR').sort((a,b) => safeScore(b) - safeScore(a));
    const TEs = players.filter(p => p.position === 'TE').sort((a,b) => safeScore(b) - safeScore(a));

    const starters: Record<string, Player[]> = {
      QB: QBs.slice(0,1),
      RB: RBs.slice(0,2),
      WR: WRs.slice(0,3),
      TE: TEs.slice(0,1),
    };

    const remaining = [...RBs.slice(2), ...WRs.slice(3), ...TEs.slice(1)];
    const FLEX = remaining.sort((a,b) => safeScore(b) - safeScore(a)).slice(0,1);

    const lineup: Record<string, LineupSlot> = {};
    players.forEach(p => {
      if (starters.QB.includes(p)) lineup[p.playerId] = 'QB';
      else if (starters.RB.includes(p)) lineup[p.playerId] = 'RB';
      else if (starters.WR.includes(p)) lineup[p.playerId] = 'WR';
      else if (starters.TE.includes(p)) lineup[p.playerId] = 'TE';
      else if (FLEX.includes(p)) lineup[p.playerId] = 'FLEX';
      else lineup[p.playerId] = 'BE';
    });

    return lineup;
  };

  const lineup = computeLineup(sortedPlayers, weekKey);

  const starters = sortedPlayers.filter(p => lineup[p.playerId] !== 'BE');
  const bench = sortedPlayers.filter(p => lineup[p.playerId] === 'BE');

  const startersSorted = starters.sort((a,b) => {
    if (lineup[a.playerId] === 'FLEX') return 1;
    if (lineup[b.playerId] === 'FLEX') return -1;
    const posCompare = (a.position ?? '').localeCompare(b.position ?? '');
    if (posCompare !== 0) return posCompare;
    return (Number(b[weekKey] ?? 0)) - (Number(a[weekKey] ?? 0));
  });

  const benchSorted = bench.sort((a,b) => {
    const posCompare = (a.position ?? '').localeCompare(b.position ?? '');
    if (posCompare !== 0) return posCompare;
    return (Number(b[weekKey] ?? 0)) - (Number(a[weekKey] ?? 0));
  });

  const displayRoster = [...startersSorted, ...benchSorted];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {user.displayName}'s Roster - Week {week}
          </DialogTitle>
          <DialogDescription asChild>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player Name</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Slot</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayRoster.map(player => (
                  <TableRow
                    key={player.playerId}
                    className={`
                      ${getPositionClass(player.position)}
                      ${lineup[player.playerId] !== 'BE' ? 'border-2' : 'opacity-65'}
                    `}
                  >
                    <TableCell>{player.playerName}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell>{Number(player[weekKey] ?? 0)}</TableCell>
                    <TableCell>{lineup[player.playerId]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WeeklyRosterModal;