'use client';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { SegmentedControl } from '@blueprintjs/core';

import Header from '@/components/header';

import { LeagueID } from '@/constants/constants';

import { User } from '@/types/types';

import StandingCol from '@/components/standingCol';

import { fetchUsersByLeagueID } from '../../api/users';

const leagueOptions = [
  { label: 'League 1', value: LeagueID.LEAGUE_1 },
  { label: 'League 2', value: LeagueID.LEAGUE_2 },
  { label: 'League 3', value: LeagueID.LEAGUE_3 },
];

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <StandingCol standings={leagueUsers} />
      </div>
    </div>
  );
}
