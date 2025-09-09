'use client';
import styles from './page.module.scss';
import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import PointTooltip from '@/components/pointToolTip';
import WeeklyStandingCol from '../../components/weeklyStandingCol';
import { User } from '../../types/types';
import { fetchAllUsers } from '../../api/users';

export default function WeeklyStandings() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch weekly standings');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="items-center">
      <Header />
      <div className="flex items-center justify-center gap-2 mb-8">
        <h1 className="text-center" style={{ fontSize: '26px'}}>
          Week {selectedWeek} Standings
        </h1>
        <PointTooltip
          message={
            <>
              Weekly standings are updated automatically:
              <br />• Thu–Mon: 9 AM, 1 PM, 4 PM, 8 PM ET
              <br />• Tue: 5 AM, 8 AM ET
            </>
          }
        />
      </div>
      <div className="text-center mb-4">
        <label htmlFor="weekSelector" className="mr-2 font-medium">Select Week:</label>
        <select
          id="weekSelector"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {Array.from({ length: 17 }, (_, i) => i + 1).map((week) => (
            <option key={week} value={week}>Week {week}</option>
          ))}
        </select>
      </div>

      <div className={styles.segmentedControl}>
        <WeeklyStandingCol standings={users} week={selectedWeek} />
      </div>
    </div>
  );
}