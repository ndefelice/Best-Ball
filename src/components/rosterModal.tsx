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
} from "@/components/ui/dialog";

const getPositionClass = (position: string) => {
  switch (position) {
    case 'RB':
      return 'bg-green-200';
    case 'WR':
      return 'bg-blue-200';
    case 'QB':
      return 'bg-red-200';
    case 'TE':
      return 'bg-orange-200';
    default:
      return 'bg-gray-100';
  }
};

const RosterModal: React.FC<{
  user: UserAndRoster;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ user, open, onOpenChange }) => {
  const sortedPlayers = user.detailedRoster
    .flatMap((rosterItem) =>
      rosterItem.map((player) => ({
        ...player,
        displayName: user.displayName,
      }))
    )
    .sort((a, b) => a.position.localeCompare(b.position));

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
                {sortedPlayers.map((player, index) => (
                    <TableRow
                    key={`${player.playerId}-${index}`}
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