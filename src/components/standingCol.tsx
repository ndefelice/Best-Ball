import React from "react";
import Standing from "@/types/Standing"; // Replace "@/path/to/Standing" with the actual path to the Standing type

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const StandingCol: React.FC<{ standings: typeof Standing[] }> = ({ standings }) => {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>League Rank</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Points</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {standings.map((standing: typeof Standing, index: number) => (
                        <TableRow 
                            key={index} 
                            className={standing.leagueRank === 1 || standing.leagueRank === 2 ? "bg-green-200" : "bg-gray-200"}
                        >
                            <TableCell>{standing.ovrRank}</TableCell>
                            <TableCell>{standing.leagueRank}</TableCell>
                            <TableCell>{standing.displayName}</TableCell>
                            <TableCell>{standing.totalPoints}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default StandingCol;