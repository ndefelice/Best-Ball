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
}

const RosterModal: React.FC<RosterModalProps> = ({ user, open, onOpenChange }) => {
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

  // Sort players by position (optional)
  const sortedPlayers = flattenedRoster.sort((a, b) =>
    (a.position ?? '').localeCompare(b.position ?? '')
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{user.displayName}'s Roster</DialogTitle>
          <DialogDescription asChild>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Team</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPlayers.map(player => (
                  <TableRow
                    key={player.playerId}
                    className={getPositionClass(player.position)}
                  >
                    <TableCell>{player.playerName}</TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.team}</TableCell>
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

export default RosterModal;