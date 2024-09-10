import React from 'react';
import { Standing } from '@/types/types';

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table';

const StandingCol: React.FC<{ standings: Standing[] }> = ({ standings }) => {
 const hasOvrRank = standings.find((standing) => standing.ovrRank) != null;

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
         {standings.map((standing: Standing, index: number) => (
           <TableRow
             key={index}
             className={
               standing.leagueRank === 1 || standing.leagueRank === 2
                 ? 'bg-green-200'
                 : 'bg-gray-200'
             }
           >
             {standing.ovrRank && <TableCell>{standing.ovrRank}</TableCell>}
             {standing.leagueRank && (
               <TableCell>{standing.leagueRank}</TableCell>
             )}

             <TableCell>
               <div style={{ display: 'flex', alignItems: 'center' }}>
                 <img
                   src={standing.userAvatar || 'https://sleepercdn.com/avatars/cc12ec49965eb7856f84d71cf85306af'}
                   alt={`${standing.displayName}'s avatar`}
                   style={{
                     width: '30px',
                     height: '30px',
                     borderRadius: '50%',
                     marginRight: '10px',
                   }}
                   onError={(e) => {
                     e.currentTarget.src = 'https://sleepercdn.com/avatars/cc12ec49965eb7856f84d71cf85306af'; // dolpin placeholder from sleeper
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
