'use client';
import { fetchStandings } from '@/api/sleeper';
import styles from './page.module.scss';
import Header from '@/components/header';
import { LeagueID } from '@/constants/constants';
import { SegmentedControl } from '@blueprintjs/core';
import { useEffect, useState } from 'react';
import { Standing } from '@/types/types';
import StandingCol from '@/components/standingCol';

const leagueOptions = [
  { label: 'League 1', value: LeagueID.LEAGUE_1 },
  { label: 'League 2', value: LeagueID.LEAGUE_2 },
  { label: 'League 3', value: LeagueID.LEAGUE_3 },
];

export default function Home() {
  const [leagueValue, setLeagueValue] = useState<LeagueID>(LeagueID.LEAGUE_1);
  const [leagueStandings, setLeagueStandings] = useState<Standing[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeagueStandings = async () => {
      try {
        const standings = await fetchStandings(leagueValue);
        setLeagueStandings(standings);
      } catch (err) {
        console.error('Error fetching standings:', err);
        setError('Failed to fetch standings');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueStandings();
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
        <StandingCol standings={leagueStandings} />
      </div>
    </div>
  );
}
