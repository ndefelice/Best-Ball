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
}

const RosterModal: React.FC<RosterModalProps> = ({ user, open, loading, onOpenChange }) => {
  const flattenedRoster: Player[] =
    user?.detailedRoster?.map((item: any) => ({
      ...(item as any)[0],
      ...item, // keep week fields
    })) ?? [];

  const sortedPlayers = flattenedRoster.sort((a, b) =>
    (a.position ?? '').localeCompare(b.position ?? '')
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{user?.displayName ?? 'Roster'}</DialogTitle>
          <DialogDescription asChild>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="animate-spin h-10 w-10 text-gray-600" />
              </div>
            ) : user ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Team</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPlayers.map((player) => (
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
            ) : null}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RosterModal;