'use client';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { SegmentedControl } from '@blueprintjs/core';

import Header from '@/components/header';

import { LeagueID, DraftID } from '@/constants/constants';

import { User } from '@/types/types';

import StandingCol from '@/components/standingCol';

import { fetchUsersByLeagueID } from '../../api/users';

const leagueOptions = [
  { label: 'League 1', value: LeagueID.LEAGUE_1 },
  { label: 'League 2', value: LeagueID.LEAGUE_2 },
  { label: 'League 3', value: LeagueID.LEAGUE_3 },
  { label: 'League 4', value: LeagueID.LEAGUE_4},
];

// Mapping of league to draft results URL
const draftResultsUrls: Record<LeagueID, string> = {
  [LeagueID.LEAGUE_1]: `https://sleeper.app/draft/nfl/${DraftID.DRAFT_1}`,
  [LeagueID.LEAGUE_2]: `https://sleeper.app/draft/nfl/${DraftID.DRAFT_2}`,
  [LeagueID.LEAGUE_3]: `https://sleeper.app/draft/nfl/${DraftID.DRAFT_3}`,
  [LeagueID.LEAGUE_4]: `https://sleeper.app/draft/nfl/${DraftID.DRAFT_4}`,
};

export default function Home() {
  const [leagueValue, setLeagueValue] = useState<LeagueID>(LeagueID.LEAGUE_1);
  const [leagueUsers, setLeagueUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeagueUsers = async (leagueValue: LeagueID) => {
      try {
        const leagueUsers = await fetchUsersByLeagueID(leagueValue);
        setLeagueUsers(leagueUsers);
      } catch (err) {
        console.error('Error fetching standings:', err);
        setError('Failed to fetch standings');
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeagueUsers(leagueValue);
  }, [leagueValue]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Header />
      <div className={styles.segmentedControl}>
        <SegmentedControl
          fill
          options={leagueOptions}
          onValueChange={(value) => setLeagueValue(value as LeagueID)}
          defaultValue={leagueValue}
        />

        <div className="my-8 flex justify-center">
          <a
            href={draftResultsUrls[leagueValue]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium text-lg"
          >
            View Draft Results
          </a>
        </div>

        <StandingCol standings={leagueUsers} />
      </div>
    </div>
  );
}