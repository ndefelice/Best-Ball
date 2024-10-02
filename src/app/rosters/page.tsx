'use client';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { SegmentedControl } from '@blueprintjs/core';

import Header from '@/components/header';
import RosterCol from '@/components/rosterCol';

import { LeagueID } from '@/constants/constants';

import { fetchRostersByLeagueId } from '../../api/rosters'

const leagueOptions = [
  { label: 'League 1', value: LeagueID.LEAGUE_1 },
  { label: 'League 2', value: LeagueID.LEAGUE_2 },
  { label: 'League 3', value: LeagueID.LEAGUE_3 },
];

export default function TestPage() {
  const [leagueValue, setLeagueValue] = useState<LeagueID>(LeagueID.LEAGUE_1);
  const [leagueData, setLeagueData] = useState<any>(null); // To store the fetched JSON data
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeagueData = async (leagueValue: LeagueID) => {
      try {
        const leagueData = await fetchRostersByLeagueId(leagueValue);
        setLeagueData(leagueData); // Store the fetched JSON data
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData(leagueValue);
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
        <RosterCol users={leagueData} />
      </div>
    </div>
  );
}
