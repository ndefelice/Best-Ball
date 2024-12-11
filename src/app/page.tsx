'use client';
import styles from './page.module.scss';
import React, { useEffect, useState } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';

import { SegmentedControl } from '@blueprintjs/core';

import Header from '../components/header';
import StandingCol from '../components/standingCol';
import PlayoffCol from '../components/playoffCol'; // Import PlayoffCol

import { fetchAllUsers } from '../api/users';
import { fetchAllPlayoffUsers, fetchPlayoffUsersByWeek } from '../api/playoffs'; // Import Playoffs API

import { User } from '../types/types';
import { PlayoffUser } from '../types/types'; // Import PlayoffUser type

const viewOptions = [
  { label: 'Regular Season', value: 'Regular Season' },
  { label: 'Playoffs', value: 'Playoffs' },
];

export default function Home() {
  const [view, setView] = useState<'Regular Season' | 'Playoffs'>('Regular Season');
  const [users, setUsers] = useState<User[]>([]);
  const [playoffUsers, setPlayoffUsers] = useState<PlayoffUser[]>([]); // State for Playoff users
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users based on the selected view
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        if (view === 'Regular Season') {
          const fetchedUsers = await fetchAllUsers();
          setUsers(fetchedUsers);
        } else if (view === 'Playoffs') {
          const fetchedPlayoffUsers = await fetchAllPlayoffUsers();
          setPlayoffUsers(fetchedPlayoffUsers);
        }
      } catch (err) {
        console.error('Error fetching standings:', err);
        setError('Failed to fetch standings');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [view]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="items-center">
      <Header />
      <h1 className="text-center" style={{ fontSize: '26px', marginBottom: '10px'}}>
        {view}
      </h1>
      <div className={styles.segmentedControl}>
        <SegmentedControl
          fill
          options={viewOptions}
          onValueChange={(value) => setView(value as 'Regular Season' | 'Playoffs')}
          defaultValue={view}
        />
        {view === 'Regular Season' ? (
          <StandingCol standings={users} />
        ) : (
          <PlayoffCol standings={playoffUsers} />
        )}
      </div>
    </div>
  );
}
