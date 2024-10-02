import React from 'react';
import { Draft } from '@/types/types'; // Ensure you have the correct type

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

// Helper function to get Tailwind classes based on player position
const getPositionClass = (position: string) => {
    switch (position) {
        case 'RB':
            return 'bg-green-200'; // Green background for RB
        case 'WR':
            return 'bg-blue-200'; // Blue background for WR
        case 'QB':
            return 'bg-red-200'; // Red background for QB
        case 'TE':
            return 'bg-orange-200'; // Orange background for TE
        default:
            return 'bg-gray-100'; // Default background for other positions
    }
};

const DraftCol: React.FC<{ drafts: Draft[] }> = ({ drafts }) => {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Pick</TableHead>
                        <TableHead>Round</TableHead>
                        <TableHead>Slot</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Team</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {drafts.flatMap((draft) => // Use flatMap to access picks from all drafts
                        draft.picks.map((pick, index) => (
                            <TableRow
                                key={`${draft.draftId}-${index}`} // Unique key for each row
                                className={getPositionClass(pick.playerPos)} // Apply position class
                            >
                                <TableCell>{pick.displayName}</TableCell>
                                <TableCell>{pick.ovr}</TableCell>
                                <TableCell>{pick.round}</TableCell>
                                <TableCell>{pick.slot}</TableCell>
                                <TableCell>{pick.playerName}</TableCell>
                                <TableCell>{pick.playerPos}</TableCell>
                                <TableCell>{pick.playerTeam}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default DraftCol;