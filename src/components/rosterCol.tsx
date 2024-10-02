import React from 'react';
import { UserAndRoster } from '@/types/types'; // Ensure you have the correct type

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

const RosterCol: React.FC<{ users: UserAndRoster[] }> = ({ users }) => {
    // Flatten and sort the players
    const sortedPlayers = users
        .flatMap((user) =>
            user.detailedRoster.flatMap((rosterItem) =>
                rosterItem.map((player) => ({
                    ...player,
                    displayName: user.displayName, // Include user display name for rendering
                }))
            )
        )
        .sort((a, b) => {
            // Sort by user displayName, then by position
            if (a.displayName === b.displayName) {
                return a.position.localeCompare(b.position);
            }
            return a.displayName.localeCompare(b.displayName);
        });

    // Group players by user displayName
    const groupedPlayers = sortedPlayers.reduce((acc, player) => {
        acc[player.displayName] = acc[player.displayName] || [];
        acc[player.displayName].push(player);
        return acc;
    }, {} as Record<string, typeof sortedPlayers>);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Player Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Team</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(groupedPlayers).map(([displayName, players]) => (
                        <React.Fragment key={displayName}>
                            <TableRow>
                                <TableCell colSpan={3} className="font-bold text-lg">
                                    {displayName} {/* User Header */}
                                </TableCell>
                            </TableRow>
                            {players.map((player, index) => (
                                <TableRow
                                    key={`${player.playerId}-${index}`} // Unique key for each row
                                    className={getPositionClass(player.position)} // Apply position class
                                >
                                    <TableCell>{player.playerName}</TableCell>
                                    <TableCell>{player.position}</TableCell>
                                    <TableCell>{player.team}</TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default RosterCol;

