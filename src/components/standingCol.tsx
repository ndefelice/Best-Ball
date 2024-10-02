import React from 'react';
import { User } from '@/types/types';

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table';

const StandingCol: React.FC<{ standings: User[] }> = ({ standings }) => {
 // Check if there is at least one ovrRank in the standings
 const hasOvrRank = standings.some((standing) => standing.ovrRank !== null);

 // Sort standings by ovrRank (ascending order), handling undefined or null values
 const sortedStandings = standings.sort((a, b) => {
   if (a.ovrRank === undefined || a.ovrRank === null) return 1; // Place null/undefined at the end
   if (b.ovrRank === undefined || b.ovrRank === null) return -1;
   return a.ovrRank - b.ovrRank; // Sort in ascending order
 });

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
         {sortedStandings.map((standing: User, index: number) => (
           <TableRow
             key={index}
             className={
               standing.leagueRank === 1 || standing.leagueRank === 2
                 ? 'bg-green-200'
                 : 'bg-gray-200'
             }
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
                       'https://sleepercdn.com/avatars/cc12ec49965eb7856f84d71cf85306af'; // Placeholder
                   }}
                 />
                 {standing.displayName}
               </div>
             </TableCell>
             <TableCell>{standing.totalPoints}</TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </div>
 );
};

export default StandingCol;