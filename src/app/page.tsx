'use client';
import styles from './page.module.scss';
import React, { useEffect, useState } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';

import Header from '../components/header';
import StandingCol from '../components/standingCol';

import { fetchAllUsers, fetchUserByUserId } from '../api/users';

import { User } from '../types/types';

import { LeagueID } from '@/constants/constants';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetchAllUsers();
        //console.log(users);
        setUsers(users); // Corrected line
      } catch (err) {
        console.error('Error fetching standings:', err);
        setError('Failed to fetch standings');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="items-center">
      <Header />
      <h1 className="text-center" style={{ fontSize: '26px' }}>
        Overall Standings
      </h1>
      <div className={styles.table}>
        <StandingCol standings={users} />
      </div>
    </div>
  );
}
