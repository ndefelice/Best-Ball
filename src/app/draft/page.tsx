'use client';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { SegmentedControl } from '@blueprintjs/core';

import Header from '@/components/header';

import { LeagueID } from '@/constants/constants';

import { Draft } from '@/types/types';

import DraftCol from '@/components/draftCol';

import { fetchDraftById } from '../../api/drafts';

const leagueOptions = [
  { label: 'League 1', value: LeagueID.LEAGUE_1 },
  { label: 'League 2', value: LeagueID.LEAGUE_2 },
  { label: 'League 3', value: LeagueID.LEAGUE_3 },
];

export default function Home() {
  const [leagueValue, setLeagueValue] = useState<LeagueID>(LeagueID.LEAGUE_1);
  const [leagueDraft, setLeagueDraft] = useState<Draft[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeagueDraft = async (leagueValue: LeagueID) => {
      try {
        const leagueDraft = await fetchDraftById(leagueValue);
        setLeagueDraft(leagueDraft);
      } catch (err) {
        console.error('Error fetching draft:', err);
        setError('Failed to fetch draft' + err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeagueDraft(leagueValue);
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
      </div>
      <DraftCol drafts={leagueDraft} />
    </div>
  );
}
