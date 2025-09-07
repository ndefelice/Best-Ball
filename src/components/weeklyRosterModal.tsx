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

import { Loader2 } from 'lucide-react';

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
  [key: string]: any;
}

interface RosterModalProps {
  user: UserAndRoster | null;
  open: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  week: number;
}

type LineupSlot = 'QB' | 'RB' | 'WR' | 'TE' | 'FLEX' | 'BE';

const WeeklyRosterModal: React.FC<RosterModalProps> = ({
  user,
  open,
  loading,
  onOpenChange,
  week,
}) => {
  const weekKey = `week${week}` as keyof Player;

  const flattenedRoster: Player[] =
    user?.detailedRoster?.map((item: any) => ({
      ...(item as any)[0],
      ...item, // week fields
    })) ?? [];

  const safeScore = (p: Player) => Number(p[weekKey] ?? 0);

  const QBs = flattenedRoster.filter(p => p.position === 'QB').sort((a,b) => safeScore(b) - safeScore(a));
  const RBs = flattenedRoster.filter(p => p.position === 'RB').sort((a,b) => safeScore(b) - safeScore(a));
  const WRs = flattenedRoster.filter(p => p.position === 'WR').sort((a,b) => safeScore(b) - safeScore(a));
  const TEs = flattenedRoster.filter(p => p.position === 'TE').sort((a,b) => safeScore(b) - safeScore(a));

  const starters = {
    QB: QBs.slice(0,1),
    RB: RBs.slice(0,2),
    WR: WRs.slice(0,3),
    TE: TEs.slice(0,1),
  };

  const remaining = [...RBs.slice(2), ...WRs.slice(3), ...TEs.slice(1)];
  const FLEX = remaining.sort((a,b) => safeScore(b) - safeScore(a)).slice(0,1);

  const lineup: Record<string, LineupSlot> = {};
  flattenedRoster.forEach(p => {
    if (starters.QB.includes(p)) lineup[p.playerId] = 'QB';
    else if (starters.RB.includes(p)) lineup[p.playerId] = 'RB';
    else if (starters.WR.includes(p)) lineup[p.playerId] = 'WR';
    else if (starters.TE.includes(p)) lineup[p.playerId] = 'TE';
    else if (FLEX.includes(p)) lineup[p.playerId] = 'FLEX';
    else lineup[p.playerId] = 'BE';
  });

  const startersSorted = flattenedRoster
    .filter(p => lineup[p.playerId] !== 'BE')
    .sort((a,b) => {
      if (lineup[a.playerId] === 'FLEX') return 1;
      if (lineup[b.playerId] === 'FLEX') return -1;
      const posCompare = (a.position ?? '').localeCompare(b.position ?? '');
      if (posCompare !== 0) return posCompare;
      return safeScore(b) - safeScore(a);
    });

  const benchSorted = flattenedRoster
    .filter(p => lineup[p.playerId] === 'BE')
    .sort((a,b) => {
      const posCompare = (a.position ?? '').localeCompare(b.position ?? '');
      if (posCompare !== 0) return posCompare;
      return safeScore(b) - safeScore(a);
    });

  const displayRoster = [...startersSorted, ...benchSorted];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {user?.displayName ?? 'Roster'} - Week {week}
          </DialogTitle>
          <DialogDescription asChild>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="animate-spin h-10 w-10 text-gray-600" />
              </div>
            ) : (
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
                  {displayRoster.map((player) => (
                    <TableRow
                      key={player.playerId}
                      className={`
                        ${getPositionClass(player.position)}
                        ${lineup[player.playerId] !== 'BE' ? 'border-2 border-yellow-500' : 'border-2 border-gray-300 opacity-65'}
                      `}
                    >
                      <TableCell>{player.playerName}</TableCell>
                      <TableCell>{player.team}</TableCell>
                      <TableCell>{safeScore(player)}</TableCell>
                      <TableCell>{lineup[player.playerId]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WeeklyRosterModal;